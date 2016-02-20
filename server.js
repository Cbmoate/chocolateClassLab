var express = require('express');
var expressHandlebars = require('express-handlebars');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('user_info_db', 'root', "");
var mysql = require('mysql');
var PORT = process.env.NODE_ENV || 3000;
var app = express();