const http = require('http');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config.env` });

const server = http.createServer((req, res) => {
  res.end('hello from server ...');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening to server : ${PORT}`);
  console.log('our NODE_ENV ::: ', process.env.NODE_ENV);
});
