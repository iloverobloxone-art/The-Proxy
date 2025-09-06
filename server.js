const express = require('express');
const Unblocker = require('unblocker');

const app = express();

// Configure Unblocker; proxy URLs start with /proxy/
const unblocker = new Unblocker({ prefix: '/proxy/' });

// Must be early in middleware stack
app.use(unblocker);

// Optional: Home page with simple usage instructions
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Proxy is Running!</title></head>
      <body>
        <h2>The proxy is live.</h2>
        <p>To use, visit: <br>
        <a href="/proxy/https://yohoho.io">/proxy/https://yohoho.io</a></p>
        <p>Or replace with any other site you want to proxy.</p>
      </body>
    </html>
  `);
});

// Listen for HTTP requests and WebSockets (required for full unblocker support)
const server = app.listen(process.env.PORT || 8080);
server.on('upgrade', unblocker.onUpgrade);
