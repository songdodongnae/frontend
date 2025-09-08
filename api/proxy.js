// api/proxy.js
export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  const targetBase =
    process.env.API_BASE ||
    "http://ec2-43-202-55-250.ap-northeast-2.compute.amazonaws.com:8080";

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(200).end();
    return;
  }

  // ---- URL/경로 파싱 ----
  const u = new URL(req.url, "http://localhost"); // dummy base
  const path = u.pathname;              // /api/festivals
  const forwardPath = path;             // 백엔드가 /api/* 받음

  // ❗ Vercel 캡처 파라미터(path, path1...) 제거
  const toDrop = [];
  u.searchParams.forEach((_, k) => { if (k === "path" || /^path\d*$/.test(k)) toDrop.push(k); });
  toDrop.forEach(k => u.searchParams.delete(k));

  // ✅ 비-GET은 쿼리 자체를 완전히 제거
  const query = (req.method === "GET" && [...u.searchParams.keys()].length)
    ? `?${u.searchParams.toString()}`
    : "";

  const upstreamUrl = `${targetBase}${forwardPath}${query}`;

  // ---- 헤더 정리 ----
  const headers = { ...req.headers };
  [
    "host","connection","keep-alive","proxy-authenticate","proxy-authorization",
    "te","trailer","upgrade","content-length","accept-encoding",
    "origin","referer"
  ].forEach(h => delete headers[h]);
  headers["x-forwarded-proto"] = "https";
  headers["x-forwarded-host"] = req.headers["x-forwarded-host"] || req.headers.host;

  // ---- 바디 버퍼링 ----
  let body;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await new Promise((resolve, reject) => {
      const chunks = [];
      req.on("data", c => chunks.push(c));
      req.on("end", () => resolve(Buffer.concat(chunks)));
      req.on("error", reject);
    });
    if (!body || body.length === 0) body = undefined;
  }

  try {
    const upstream = await fetch(upstreamUrl, { method: req.method, headers, body });

    // 디버그 헤더
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("x-forward-url", upstreamUrl);
    res.setHeader("x-debug-method", req.method);
    res.setHeader("x-debug-path", path);
    res.setHeader("x-debug-forward-path", forwardPath);
    res.setHeader("x-debug-body-bytes", String(body ? body.length : 0));

    // 업스트림 헤더 전달(충돌 항목 제외)
    upstream.headers.forEach((v, k) => {
      const lk = k.toLowerCase();
      if (lk === "content-encoding" || lk === "content-length") return;
      res.setHeader(k, v);
    });

    const buf = Buffer.from(await upstream.arrayBuffer());
    res.status(upstream.status).send(buf);
  } catch (e) {
    res.setHeader("x-forward-url", upstreamUrl);
    res.status(502).json({ message: "Bad gateway", error: String(e) });
  }
}
