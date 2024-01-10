const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',  // API endpoints
    createProxyMiddleware({
      target: 'http://localhost:5000',  // Your backend server
      changeOrigin: true,
    })
  );
};
