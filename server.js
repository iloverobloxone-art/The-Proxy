const express = require('express');
const Unblocker = require('unblocker'); // Use "nfriedly/node-unblocker" via GitHub

const app = express();
const mirror = new Unblocker({
  prefix: '/r327/',
  requestMiddleware: [
    function (req, res, next) {
      // Spoof a generic User-Agent, remove proxy-ish headers
      req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
      delete req.headers['x-forwarded-for'];
      delete req.headers['via'];
      next();
    }
  ]
});

app.use(mirror);

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Resource Mirror</title></head>
      <body>
        <h2>Online Resource Viewer</h2>
        <form onsubmit="location.href='/r327/' + document.getElementById('input').value; return false;">
          <input id="input" type="text" autocomplete="off" placeholder="https://en.wikipedia.org/" style="width:320px;">
          <button type="submit">Open Resource</button>
        </form>
        <p>View web resources and assignments safely.</p>
      </body>
    </html>
  `);
});

const server = app.listen(process.env.PORT || 8080);
server.on('upgrade', mirror.onUpgrade);
