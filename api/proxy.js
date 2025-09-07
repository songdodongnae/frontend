// api/proxy.js
export default async function handler(req, res) {
  // ✅ 배포에서 사용할 EC2 주소(정확한 리전/호스트로!)
  const targetBase =
    process.env.API_BASE ||
    "http://ec2-43-202-55-250.ap-northeast-2.compute.amazonaws.com:8080";
  // ↑ ap-northeast-2/3 중 실제로 잘 되는 쪽으로 꼭 맞추세요!

  // 원 요청의 path & query
  const qi = req.url.indexOf("?");
  const qs = qi !== -1 ? req.url.slice(qi) : "";
  const path = req.url.split("?")[0]; // 예: /api/curations

  // ❗중요: /api 프리픽스 유지해서 전달 (/api/curations -> /api/curations)
  const forwardPath = path;

  const url = `${targetBase}${forwardPath}${qs}`;

  // Hop-by-hop 헤더 제거 (프록시 안정성)
  const headers = { ...req.headers };
  [
    "host",
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "upgrade",
    "content-length",
    "accept-encoding", // 압축 충돌 방지
  ].forEach((h) => delete headers[h]);

  const init = { method: req.method, headers };

  // GET/HEAD 외에는 바디 전달
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req; // 스트리밍 전달
  }

  try {
    const upstream = await fetch(url, init);

    // 디버깅용 헤더(무슨 URL로 포워딩했는지 바로 확인 가능)
    res.setHeader("x-forward-url", url);
    res.status(upstream.status);

    upstream.headers.forEach((v, k) => {
      const lk = k.toLowerCase();
      if (lk === "content-encoding" || lk === "content-length") return;
      res.setHeader(k, v);
    });

    const buf = Buffer.from(await upstream.arrayBuffer());
    res.send(buf);
  } catch (e) {
    res.setHeader("x-forward-url", url);
    res.status(502).json({ message: "Bad gateway", error: String(e) });
  }
}
