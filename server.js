const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: `${__dirname}/config.env` });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening to server : ${PORT}`);
  console.log('our NODE_ENV ::: ', process.env.NODE_ENV);
});
