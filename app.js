const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const placeRouter = require('./routes/placeRoutes');

dotenv.config({ path: `${__dirname}/config.env` });
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/places', placeRouter);

module.exports = app;
