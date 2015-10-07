// var express          = require('express');
// var router           = express.Router();
// var bodyParser       = require('body-parser');
// // var passport         = require('passport');
// var methodOverride   = require('method-override');
// var usersController  = require('../controllers/users');
// var photosController = require('../controllers/photos');

module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('login.ejs'); // load the index.ejs file
    });

    app.get('/map', function(req, res) {
        res.render('index.ejs');
    });

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

        // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/map');
    });

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/map',
            failureRedirect : '/fail'
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
