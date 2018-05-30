const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// process.env.PORT - for HEROKU
const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));





app.listen(PORT, () => console.log(`server listening on ${PORT}`));

