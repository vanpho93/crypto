var express = require('express');
var app = express();
var database = require('./db.js');
var crypto = require('./crypto.js');
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));
app.listen(3000);
var parser = bodyParser.urlencoded({extended: false});

app.get('/', function(req, res){
  res.render('homepage');
});

app.post('/signin', parser, function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  database.checkSignIn(username, password, onError, function(result){
    var msg;
    if(result.rowCount == 1){
      var dbPass = result.rows[0].password;
      console.log('dbPass: ' + crypto.decrypt(dbPass));
      console.log('mu pass: ' + password);
      msg = password == crypto.decrypt(dbPass)?
            "Dang nhap thanh cong":
            "Kiem tra password";
    }else{
      msg= "Username khong ton tai";
    }
    res.send(msg);
  });
});

app.get('/signup', function(req, res){
  res.render('signup');
});

app.post('/formSignUp', parser, function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  database.insertUser(username, password, email, function(result){
    var msg = result.rowCount == 1?
              "Dang ky thanh cong":
              "Dang ky that bai";
    res.send(msg);
  });
});

function onError(err){
  console.log(err);
}
