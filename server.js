const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/proxy', (req, res, next) => {
  const url = req.query.url;
  if (!url || !/^https?:\/\//.test(url)) {
    return res.status(400).send("Missing or invalid url parameter");
  }
  createProxyMiddleware({
    target: url,
    changeOrigin: true,
    pathRewrite: { '^/proxy': '' },
    selfHandleResponse: false
  })(req, res, next);
});

app.get('/', (req, res) => res.send('Proxy server running!'));
app.listen(process.env.PORT || 3000);
