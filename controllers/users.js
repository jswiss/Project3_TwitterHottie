

//GET /signup

//POST /signup

//GET /login

//POST /login

//GET /logout

//Restricted pages
function home(req, res) {
	res.render('index.ejs');
}

module.exports = {
	home: home
}

