const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.end('hello from express app ...');
  console.log('ici');
});

module.exports = app;
