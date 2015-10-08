// var express          = require('express');
// var router           = express.Router();
// var bodyParser       = require('body-parser');
// // var passport         = require('passport');
// var methodOverride   = require('method-override');
// var usersController  = require('../controllers/users');
// var photosController = require('../controllers/photos');
var Tag            = require('../models/tag');
var Photo          = require('../models/photo');
var User           = require('../models/user');

module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('login.ejs'); // load the index.ejs file
    });

    app.get('/map', isLoggedIn, function(req, res) {
        res.render('index.ejs', {
            user: req.user
        });
    });

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        var photos = Photo.find({ user: req.user._id}, function(err, returnedObject) {
    
            res.render('profile.ejs', {
                user    : req.user, // get the user out of session and pass to template
                photos   : returnedObject
            });
        });
    });

        // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    app.post('/photos', function(req, res) {
        console.log(req.body);

        Photo.create({ screenName: req.body.screenName, url: req.body.url, user: req.user.id }, function(err, photo) {
            if(err) console.log(err)
            res.json(req.user)
        })
    })


    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter', { scope: ['email', 'profile.photos'] } ));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/map',
            failureRedirect : '/error'
        }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        // $('#passport-login-box').hide;
        return next();

    if (req.user) 

    // if they aren't redirect them to the home page
    res.redirect('/');
};
