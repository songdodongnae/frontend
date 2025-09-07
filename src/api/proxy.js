export default async function handler(req, res) {
    const targetBase = "http://ec2-43-202-55-250.ap-northeast-2.compute.amazonaws.com:8080";
  
    const url = targetBase + req.url; // 요청 path 그대로 붙이기
    const response = await fetch(url, {
      method: req.method,
      headers: { ...req.headers },
      body: req.method !== "GET" ? req.body : undefined,
    });
  
    // 응답 전달
    const text = await response.text();
    res.status(response.status).send(text);
  }
  