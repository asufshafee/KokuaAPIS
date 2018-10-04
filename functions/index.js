const functions = require('firebase-functions');
exports.bigben1 = functions.https.onRequest((req, res) => {
  const hours = (new Date().getHours() % 12) + 1 // London is UTC + 1hr;
  res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
      ${'BONG '.repeat(hours)}
    </body>
  </html>`);
});

exports.getEmail = require('./api/routes/getemails');
exports.SendEmils = require('./api/routes/sendEmail');


