const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
app.use('/proxy', createProxyMiddleware({
  target: '', // set dynamically
  changeOrigin: true,
  router: req => req.query.url,
  pathRewrite: { '^/proxy': '' }
}));
app.get('/', (req, res) => res.send('Proxy server running!'));
app.listen(process.env.PORT || 3000);
