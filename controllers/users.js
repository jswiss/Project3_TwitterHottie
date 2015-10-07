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

//twitter auth
function twitAuth(){
	passport.authenticate('twitter');
};

//twitter auth callback

function twitCallback() {
	passport.authenticate('twitter', {
		successRedirect: '/profile',
		failureRedirect: '/'
	});
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}


module.exports = {
	home:         home,
	login:        login,
	profile:      profile,
	isLoggedIn:   isLoggedIn,
	twitAuth:     twitAuth,
	twitCallback: twitCallback
};

