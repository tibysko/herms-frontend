const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PATH_ENV = process.env.FRONTEND_PATH;
const ABSOLUTE_PATH = path.join(__dirname, PATH_ENV);
const PORT = process.env.FRONTEND_PORT || 3000;

if (PATH_ENV && fs.existsSync(PATH_ENV)) {
  console.log(`Serving frontend from: ${ABSOLUTE_PATH}`);

  app.use(express.static(ABSOLUTE_PATH));
} else {
  console.error(`Could find path for frontend files: ${PATH_ENV}`);
}

app.listen(PORT, function () {
  console.log(`Frontend listening on port ${PORT}!`);
});
