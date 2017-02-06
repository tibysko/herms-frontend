const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PATH_ENV = process.env.FRONTEND_PATH;
const PORT = process.env.FRONTEND_PORT || 3000;

if (PATH_ENV) {
  let ABSOLUTE_PATH = path.join(__dirname, PATH_ENV);
  console.log(`Serving frontend from: ${ABSOLUTE_PATH}`);

  app.use(express.static(ABSOLUTE_PATH));

  app.get('/*', function (req, res) {
    res.sendFile(ABSOLUTE_PATH + '/index.html');
  });
} else {
  console.error(`Could find path for frontend files: ${PATH_ENV}`);
}

app.listen(PORT, function () {
  console.log(`Frontend listening on port ${PORT}!`);
});
