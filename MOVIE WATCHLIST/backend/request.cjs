const http = require('http');
const payload = JSON.stringify({ username: 'cliuser2', email: 'cliuser2@example.com', password: 'password123' });
const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
  },
};

const req = http.request(options, (res) => {
  console.log('STATUS', res.statusCode);
  console.log('HEADERS', res.headers);
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => console.log('BODY', body));
});

req.on('error', (e) => console.error('Request error', e));
req.write(payload);
req.end();
