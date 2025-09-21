// src/setupProxy.js (CRA 전용)
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ec2-43-202-55-250.ap-northeast-2.compute.amazonaws.com:8080',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      onProxyReq(proxyReq, req, res) {
        console.log('Proxying request:', req.method, req.url);
        // 토큰 엔드포인트는 무인증 가정 → 방해될 수 있는 헤더 제거
        proxyReq.removeHeader('authorization');
        proxyReq.removeHeader('cookie');
        proxyReq.removeHeader('origin');
        proxyReq.removeHeader('referer');
      },
      onError(err, req, res) {
        console.error('Proxy error:', err);
      }
    })
  );
};
