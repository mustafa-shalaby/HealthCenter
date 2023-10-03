"use strict";

// const express = require("express");
// const bodyParser = require("body-parser");
// const router = express.Router();
// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// router.get('/', (req, res) => {
//     res.sendfile("index.html");
// });
// router.post('/login', (req, res) => {
//     var user_name = req.body.user;
//     var password = req.body.password;
//     console.log("User name = " + user_name + ", password is " + password);
//     res.end("yes");
// });
// app.listen(3000, () => {
//     console.log("Started on PORT 3000");
// })
// app.post('/blogs', (req, res) => {
//     console.log(req.body);
//     const blog;
//     blog.save()
//         .then(result => {
//             res.redirect('/about');
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });
// const Blog = require('./models/blog');
// const dbURI = "mongodb+srv://netninja:test1234@net-ninja-tuts-del96.mongodb.net/node-tuts";
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(result => app.listen(3000))
//     .catch(err => console.log(err));
var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('views', './public');
app.use(bodyParser.json());
app.use(express.logger('dev'));
app.use(express["static"]('./public'));
app.use(express["static"]('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use('/css', express["static"]('css'));
app.use('/js', express["static"]('js'));
app.use('/images', express["static"]('images'));
app.use('/fonts', express["static"]('fonts'));
app.use('/dist', express["static"]('dist'));
app.use('/vendor', express["static"]('vendor'));
app.get('/', function (req, res) {
  res.sendFile('./index.html', {
    root: __dirname
  });
});
app.get('/home', function (req, res) {
  res.sendFile('./index.html', {
    root: __dirname
  });
  console.log("what the Fuck");
});
app.get('/login', function (req, res) {
  res.sendFile('./login.html', {
    root: __dirname
  });
});
app.post('/logform', function (req, res) {
  console.log(req.body);
  console.log(res.body);
  console.log(JSON.stringify(req.body));
});
app.get('/logtoaccount', function (req, res) {
  res.sendFile('./index.html', {
    root: __dirname
  });
});
app.listen(3035);