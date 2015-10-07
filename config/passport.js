var TwitterStrategy = require('passport-twitter').Strategy;

//load user model
var User            = require('../models/user');

//load authorisation vars
var configAuth      = require('./auth');

module.exports = function(passport) {

	//serialise user for session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	//deserialise user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

  // ===============TWITTER ====================

    passport.use(new TwitterStrategy ({
	    	consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL
      },
      function(token, tokenSecret, profile, done) {
        console.log(profile)

    		User.findOne({ 'twitter.id': profile.id }, function(err, user) {
    			//if there's an error, stop everything and return error
    			if (err)
    				return done(err);

    			//if user found, log 'em in!
    			if (user) {
    				return done(null, user); //user found, return the user
    			} else {
    				//if there is no user, create 'em!
    				var newUser = new User();

    				//user data we need
    				newUser.twitter.id          = profile.id;
            newUser.twitter.token       = token;
            newUser.twitter.username    = profile.username;
            newUser.twitter.displayName = profile.displayName;

            //save user to DB
            newUser.save(function(err, user) {
            	if (err)
            		throw err;
            	console.log(user)
            	return done(null, user)
            });
    			}
    		});
    	});
    }));
};

