var express = require('express');
var app = express();
var PORT = process.env.NODE_ENV || 3000;

var expressHandlebars = require('express-handlebars');
app.enging('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));

var Sequelize = require('sequelize');
var connection = new Sequelize('clubhouse_db', 'root');

app.get('/', function(req, res){
  res.render('chocolate', {chocolates});

});

connection.sync().then(function(){
  app.listen(PORT, function(){
    console.log('Online on:' +PORT)
  });
});
