var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var morgan  = require('morgan');
var port    = process.env.PORT || 3000;

app.set('view engine', 'ejs') //uses ejs as view engine
app.set('views', './views') //tells express to look for ejs files in views folder

//logging middleware
app.use(morgan('dev'));

//serve static assets (js, css, images) from the 'public' folder
app.use(express.static(__dirname + '/public'));