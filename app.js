const express = require('express');
const placeRouter = require('./routes/placeRoutes');

const app = express();

app.use('/api/v1/places', placeRouter);

module.exports = app;
