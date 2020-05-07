const server = require('http').createServer((req, res) => {
  res.end('hello from server ...');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening to server : ${PORT}`);
});
