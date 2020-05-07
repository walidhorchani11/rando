const express = require('express');
const placeRouter = require('./routes/placeRoutes');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/places', placeRouter);

module.exports = app;
