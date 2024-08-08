const http = require('http');
const url = require('url');
const QRCode = require('qrcode');

const port = 4000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/generate') {
    const data = "hello world!";

    QRCode.toDataURL(data, function (err, qrUrl) {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error!');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(
          `<html>
            <head>
              <title>QR code generator</title>
            </head>
            <body>
              <h1>Example QR code</h1>
              <img src="${qrUrl}" alt="example qr code">
            </body>
          </html>`
        );
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`QR code generator app listening at http://localhost:${port}`);
});
