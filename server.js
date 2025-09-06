const express = require('express');
const Unblocker = require('unblocker'); // Correct import!

const app = express();

// Use a neutral, non-proxy prefix to evade school keyword filters
const unblocker = new Unblocker({ prefix: '/school-approved/' }); // Change this prefix as needed

// Register Unblocker middleware early in the stack
app.use(unblocker);

// Optional landing page with instructions
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Proxy is Running!</title></head>
      <body>
        <h2>The proxy is live.</h2>
        <p>To use, visit: <br>
        <a href="/school-approved/https://yohoho.io">/school-approved/https://yohoho.io</a></p>
        <p>Or replace with any other site you want to proxy.</p>
      </body>
    </html>
  `);
});

// WebSockets support (required for full unblocker functionality)
const server = app.listen(process.env.PORT || 8080);
server.on('upgrade', unblocker.onUpgrade);
