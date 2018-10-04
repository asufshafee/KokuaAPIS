const express = require('express');
const app = express();

const getEmail = require('./api/routes/getemails');
const SendEmils = require('./api/routes/sendEmail');

app.use('/getemails', getEmail);

app.use('/SendEmail', SendEmils);

module.exports = app;