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

// pour les routes inexistant
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `path ${req.originalUrl} not found!`,
  // });

  // creation d error
  const error = new Error(`paath ${req.originalUrl} not found!`);
  error.status = 'fail';
  error.statusCode = 404;

  next(error);
});

app.use((error, req, res, next) => {
  error.status = error.status || 'fail';
  error.statusCode = error.statusCode || 500;

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
});

module.exports = app;
