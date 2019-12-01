const express = require('express');
const mongoose = require('mongoose');
const {
  DATABASE: { uri, options },
} = require('./configs');
const router = require('./router');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(uri, options);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));
app.use('/api/v1', router);
app.listen(PORT, () => console.info(`Listening on port ${PORT}!`));
