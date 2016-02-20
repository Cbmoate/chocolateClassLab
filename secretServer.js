//express
var express = require('express');
var app = express();
var PORT = process.env.NODE_ENV || 3000;

//bcrypt + bodyparse
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));

//handlebars
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));

//sequelize
var Sequelize = require('sequelize');
var connection = new Sequelize('clubhouse_db', 'root');

//passport
var passport = require('passport');
var passportLocal = require('passport-local');

app.use(passport.initialize());
app.use(passport.session());

var User = connection.define('user',{
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    uniqe: true
  },
  password: {
    type:  Sequelize.STRING,
    allowNull: false,
    validate : {
      len: {
        args: [5,10],
        msg: "Your passowrd must be 5-10 characters"
      },
    }
  }, {
    hooks: {
      beforeCreate: function(input){
        input.password = bcrypt.hashSync(input.password,9001);
      }
    }
  }
});

app.get('/', function(req, res){
  res.render('index', {msg: req.query.msg});
})


//connecting server
connection.sync().then(function(){
  app.listen(PORT, function(){
    console.log('Online on:' +PORT)
  });
});
