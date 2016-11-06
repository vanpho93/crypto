var express = require('express');
var app = express();
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
  res.send(username + ': ' + password);
});
