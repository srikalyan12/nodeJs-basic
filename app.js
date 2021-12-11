const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>This is node app from port 3000</title></head>');
    res.write(
      '<body><h1>Keep Node Js learning: HTTP module 1</h1><form action="/message" method="POST"><input type="text" name="message" value="form value is POST" /><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    res.end();
    return;
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      // const message = parseBody.split('=')[1];
      fs.writeFile('message.txt', parseBody, (error) => {
        //if no error in writing file error will value be null.
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      });
      // writeFileSync stop execution of next line till file created and written
      // this may be problem when it has huge file to write.
      // fs.writeFileSync('message.txt', parseBody);

      // res.statusCode = 302;
      // res.setHeader('Location', '/');
      // res.end();
    });
    return;
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>This is node app from port 3000</title></head>');
  res.write(
    '<body><h1>Keep Node Js learning: HTTP module 2</h1><p>New Learning</p></body>'
  );
  res.write('</html>');
  res.end();
});

server.listen(3000, () => console.log('listening to port 3000'));
