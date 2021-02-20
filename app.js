const express = require('express');
const app = express();
const router = require('./routes');
const path = require('path');

app.set(path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

module.exports = app;