const express = require('express');
const unblocker = require('unblocker');
const app = express();

// Unblocker middleware automatically rewrites URLs and assets
app.use(unblocker({
  prefix: '/proxy/', // Path prefix for proxied URLs
  requestMiddleware: [
    // Additional request middleware or logging (optional)
  ],
  responseMiddleware: [
    // Additional response middleware (optional)
  ]
}));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Unblocker Proxy</title></head>
      <body>
        <h2>Game Proxy is Running!</h2>
        <p>To use, go to: <br>
        <a href="/proxy/https://yohoho.io">/proxy/https://yohoho.io</a><br>
        Or any other game site.</p>
      </body>
    </html>
  `);
});

app.listen(process.env.PORT || 8080);
