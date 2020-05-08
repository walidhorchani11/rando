const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const placeRouter = require('./routes/placeRoutes');

dotenv.config({ path: `${__dirname}/config.env` });
const app = express();

console.log('in app express env is ::: ', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/places', placeRouter);

module.exports = app;
