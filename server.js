const express = require('express');
const Unblocker = require('unblocker'); // Install with: "unblocker": "nfriedly/node-unblocker" in package.json

const app = express();

// NEUTRAL, RANDOM prefix for routing requests
const unblocker = new Unblocker({ prefix: '/docview327/', 
  requestMiddleware: [
    function (req, res, next) {
      // Disguise traffic by removing proxy indicators; spoof User-Agent, remove X-Forwarded headers
      req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)';
      delete req.headers['x-forwarded-for'];
      delete req.headers['via'];
      next();
    }
  ]
});

app.use(unblocker);

// GENERIC home page, no mention of “proxy”
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Resource Gateway</title></head>
      <body>
        <h2>Online Resource Viewer</h2>
        <form onsubmit="location.href='/docview327/' + document.getElementById('target').value; return false;">
          <input id="target" type="text" autocomplete="off" placeholder="https://example.com" style="width:300px;">
          <button type="submit">Open Resource</button>
        </form>
        <p>Enter any full URL to open a document or website. Designed for previewing academic resources.</p>
      </body>
    </html>
  `);
});

const server = app.listen(process.env.PORT || 8080);
server.on('upgrade', unblocker.onUpgrade);
