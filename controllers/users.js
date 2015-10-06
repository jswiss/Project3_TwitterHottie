//GET /login
function login(req, res) {
	res.render('login.ejs', { message: req.flash('loginMessage') });
};

//POST /login

//GET /logout
function logout(req, res) {
	req.logout();
	res.redirect('/')
}

//Restricted pages
function home(req, res) {
	res.render('index.ejs');
}

function profile(req, res) {
	res.render('profile.ejs', {
		user: req.user //gets the user out of the session and passes to passport template
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = {
	home:       home,
	login:      login,
	profile:    profile,
	isLoggedIn: isLoggedIn
};

