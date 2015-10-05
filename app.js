var express        = require('express');
var app            = express();
var server         = require('http').createServer(app);
var mongoose       = require('mongoose');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var port           = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost/twitterhottie')

var Tag            = require('./models/tag');
var Photo          = require('./models/photo');
var User           = require('./models/user');

app.set('view engine', 'ejs') //uses ejs as view engine
app.set('views', './views') //tells express to look for ejs files in views folder

//logging middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(bodyParser.json());


//serve static assets (js, css, images) from the 'public' folder
app.use(express.static(__dirname + '/public'));

var josh = new User({
	username: "Josh"
});

var selfie = new Photo({
	url: 'http://www.bad-selfies.com/wp-content/uploads/2014/04/andy-bad-selfie-630x4721.jpg',
	user: josh
});

selfie.tags.push({
	tag: 'burrrrppp'
})

josh.save(function(error, user) {
	if (error) console.log(error);
	console.log("josh saved");
});

selfie.save(function(error, photo) {
	if (error) console.log(error)
	console.log("Photo saved")
	console.log(selfie.user);
});

















