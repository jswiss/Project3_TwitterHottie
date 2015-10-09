//OUR REQUIRES
var express        = require('express');
var app            = express();
var server         = require('http').createServer(app);
var mongoose       = require('mongoose');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var passport       = require('passport');
var cookieParser   = require('cookie-parser');
// var geocoder       = require('geocoder');
var io             = require('socket.io')(server);
var session        = require('express-session');
var flash          = require('connect-flash');

var http           = require('http')
var Twit           = require('twit');
var geocoderProvider = 'google';
var httpAdapter    = 'http';
var geocoder       = require('node-geocoder')(geocoderProvider, httpAdapter);
var port           = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/twitterhottie');

var Tag            = require('./models/tag');
var Photo          = require('./models/photo');
var User           = require('./models/user');

app.set('view engine', 'ejs'); //uses ejs as view engine
app.set('views', './views'); //tells express to look for ejs files in views folder

//passport shiz
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: false }})); //session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/passport')(passport); // pass passport for configuration

//logging middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressLayouts);
app.use(morgan('dev'));
app.use(cookieParser());
// app.use(routes);

//serve static assets (js, css, images) from the 'public' folder
app.use(express.static(__dirname + '/public'));

require('./config/routes')(app, passport);
// var josh = new User({
// 	username: "Josh"
// });

// var selfie = new Photo({
// 	url: 'http://www.bad-selfies.com/wp-content/uploads/2014/04/andy-bad-selfie-630x4721.jpg',
// 	user: josh
// });

// selfie.tags.push({
// 	tag: 'burrrrppp'
// })

// josh.save(function(error, user) {
// 	if (error) console.log(error);
// 	console.log("josh saved");
// });

// selfie.save(function(error, photo) {
// 	if (error) console.log(error)
// 	console.log("Photo saved")
// 	console.log(selfie.user);
// });

server.listen(port, function() {
	console.log('server started')
});

//web socket stuff

var twitter = new Twit({
  consumer_key:        process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:     process.env.TWITTER_CONSUMER_SECRET,
  access_token:        process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

io.on('connect', function(socket) { //when someone connects, do something
  console.log('someone has connected!');
  socket.on('mapLocation', function(mapLocation) {
    // console.log(mapLocation)
    var stream = twitter.stream('statuses/filter', { track: 'and, the, if, or, but, I, lol, omg, sexy, hot, selfie, bieber, kardashian, et, la, le, les, si, ou, mais, moi, y, si, pero, yo' });
    // console.log(stream)

    stream.on('tweet', function(tweet) {
      var data = {};
          // console.log(tweet)
      data.name = tweet.user.name;
      data.screen_name = tweet.user.screen_name;
      data.text = tweet.text;
      data.user_profile_image = tweet.user.profile_image_url;

      if (tweet.place) {

        var geocoderPlaceName = tweet.place.name + ', ' + tweet.place.country;

      if (tweet.entities.media) {
        
        geocoder.geocode(geocoderPlaceName, function(err, res) {
          // console.log(res);
          // console.log("*************************");
          console.log(tweet.entities.media[0].media_url);
          // console.log("*************************");
          var toSend = {tweet: tweet, coords: res};
          socket.emit('tweets', toSend);
        });
      }
    }
    });
  });
});


    // var screenNameCapture   = $(this).prev().prev().text()
    // var newPhoto            = new Photo();
    // var currentUser         = req.user.id;

    // newPhoto.screenName = screenNameCapture;
    // newPhoto.user       = currentUser;

    // newPhoto.save(function(err) {
    //   if (err)
    //     throw err;
    //   return done(null, newPhoto)
    // })

  //  app.put('/whatever', function(req, res){
      //findorcreate mongoose
      // new Photo // check out heathrow
    // photo.create
  // })
