"use strict";

var express = require('express');

var app = express();
app.use(express.urlencoded({
  extended: true
})); // routes

app.get('/', function (req, res) {
  res.sendFile('./create.html', {
    root: __dirname
  });
});
app.post('/blogs', function (req, res) {
  console.log(req.body);
});
app.listen("2007");