// src/setupProxy.js (CRA 전용)
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ec2-43-202-55-250.ap-northeast-2.compute.amazonaws.com:8080',
      changeOrigin: true,
      onProxyReq(proxyReq) {
        // 토큰 엔드포인트는 무인증 가정 → 방해될 수 있는 헤더 제거
        proxyReq.removeHeader('authorization');
        proxyReq.removeHeader('cookie');
        proxyReq.removeHeader('origin');
        proxyReq.removeHeader('referer');
      },
    })
  );
};
