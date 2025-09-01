const express = require('express');
const unblocker = require('unblocker');
const app = express();

app.use(unblocker({
  prefix: '/proxy/'
}));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Unblocker Proxy on Vercel</title></head>
      <body>
        <h2>Game Proxy is Running on Vercel!</h2>
        <p>Try visiting: <a href="/proxy/https://yohoho.io">/proxy/https://yohoho.io</a></p>
      </body>
    </html>
  `);
});

app.listen(process.env.PORT || 3000);
