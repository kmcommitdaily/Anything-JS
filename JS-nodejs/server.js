const http = require('http');

// object:
// req = information about the request
// res = we used to send request to user

const server = http.createServer((req, res) => {
  console.log('request made');
});

// localhost = like a domain name on the web, it refers to the local computer or device that you're currently using.
// portname = like doors into a computer, numerical identifier used in networking to differentiate between different services or applications running on a single computer.

server.listen(3000, 'localhost', () => {
  console.log('listening');
});
