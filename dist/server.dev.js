"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var app = express();

var multer = require('multer');

var morgan = require('morgan');

var mongoose = require('mongoose');

var formidable = require('formidable');

var fs = require('fs');

var fileUpload = require('express-fileupload');

var Test = require('./models/tests');

var Result = require('./models/results');

var Signup = require('./models/signups'); //connect to mongo Databse


var dbURI = "mongodb+srv://shalaby:0000@dnatest.82wln.mongodb.net/DNA_Tests?retryWrites=true&w=majority";
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (result) {
  console.log("connected to database");
  app.listen(3030);
})["catch"](function (err) {
  return console.log(err);
});
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(fileUpload()); //middleware and json object

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express["static"]('./public'));
app.use(express["static"]('public')); //calling html , css , javascript files for dynamic page

app.use('/css', express["static"]('css'));
app.use('/js', express["static"]('js'));
app.use('/audio', express["static"]('audio'));
app.use('/images', express["static"]('images'));
app.use('/fonts', express["static"]('fonts'));
app.use('/dist', express["static"]('dist'));
app.use('/vendor', express["static"]('vendor'));
app.use('/script', express["static"]('script'));
app.get(['/', '/home'], function (req, res) {
  // res.sendFile('./index.html', { root: __dirname });
  res.render('index');
});
app.get(['/returntohome'], function (req, res) {
  res.render("index", {
    usern: logedinusername
  });
});
app.get('/signup', function (req, res) {
  res.render('signup');
});
app.get('/login', function (req, res) {
  // res.sendFile('./login.html', { root: __dirname });
  res.render('login');
});
app.get('/logout', function (req, res) {
  logedinusername = undefined;
  res.render("index", {
    usern: logedinusername
  });
});
app.get('/userprofile', function (req, res) {
  // person = { clientname: "jack sparrow" , dob: "10-12-3233", age: "31", address: "New York", shorttandem: "asdada", testresult: "no" };
  // const userresult = new Result(person);
  // console.log(userresult);
  // userresult.save()
  //     .then(result => {})
  //     .catch(err => {
  //         console.log(err);
  //     });
  Result.findOne({
    "clientname": clientusername
  }).then(function (result) {
    console.log(result);

    if (result == null) {
      res.render("profile", {
        tests: undefined,
        results: undefined,
        usern: logedinusername
      });
    } else {
      res.render("profile", {
        tests: userid,
        results: result,
        usern: logedinusername
      });
    }
  })["catch"](function (err) {
    console.log(err);
  });
});
app.post('/signform', function (req, res) {
  signedusername = req.body.username;
  signedpassword = req.body.password;
  console.log(req.body);
  var signup = new Signup(req.body);
  signup.save().then(function (result) {
    res.render("login");
  })["catch"](function (err) {
    console.log(err);
  });
});
var logedinusername = "";
app.post('/logform', function (req, res) {
  logedinusername = "Hello " + req.body.username;
  console.log(req.body);
  Signup.findOne({
    "username": req.body.username,
    "password": req.body.password
  }).then(function (result) {
    if (result == null) {
      logerr = "hello";
      res.render("login", {
        invaildlog: logerr
      });
    } else {
      logerr = undefined;
      res.render("index", {
        usern: logedinusername
      });
    }
  })["catch"](function (err) {
    console.log(err);
  }); // res.redirect('/loginfo');
  // console.log(JSON.stringify(req.body));
});
var clientusername = "";
app.post('/makeappointment', function (req, res) {
  console.log(req.body);
  var test = new Test(req.body); // console.log(test.id);

  clientusername = test.name;
  userid = test;
  test.save().then(function (result) {
    res.render("index", {
      usern: logedinusername,
      tests: userid
    });
  })["catch"](function (err) {
    console.log(err);
  });
});
app.post('/checkDNA', function (req, res) {
  console.log(req.body);
  uploedefatherfile = req.files.fatherfile;
  uploedefatherfile.mv(__dirname + '/script/' + "father.fasta");
  uploedesonfile = req.files.sonfile;
  uploedesonfile.mv(__dirname + '/script/' + "son.fasta");

  var _require = require('python-shell'),
      PythonShell = _require.PythonShell;

  var pyshell = new PythonShell('./script/tandem.py');
  pyshell.on('message', function (message) {
    console.log(message);
  });
  pyshell.end(function (err) {
    if (err) {
      throw err;
    }

    ;
    console.log('finished');
  });
  logo = 'hello';
  res.render("profile", {
    usern: logedinusername,
    logos: logo
  });
});
app.post('/checkDNAText', function (req, res) {
  fs.writeFile('D:/nodejs/public/script/father.fasta', req.body.fathertext, function (err) {
    if (err) throw err;
    console.log('father file  saved!');
  });
  fs.writeFile('D:/nodejs/public/script/son.fasta', req.body.sontext, function (err) {
    if (err) throw err;
    console.log('son file  saved!');
  });

  var _require2 = require('python-shell'),
      PythonShell = _require2.PythonShell;

  var pyshell = new PythonShell('./script/tandem.py');
  pyshell.on('message', function (message) {
    console.log(message);
  });
  pyshell.end(function (err) {
    if (err) {
      throw err;
    }

    ;
    console.log('finished');
  });
  imagepath = '/images/Result_Graph.jpg';
  logo = 'hello';
  res.render("profile", {
    usern: logedinusername,
    logos: logo
  });
}); // app.listen(3037);