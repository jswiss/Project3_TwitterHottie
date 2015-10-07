var express          = require('express');
var router           = express.Router();
var bodyParser       = require('body-parser');
var passport         = require('passport');
var methodOverride   = require('method-override');
var usersController  = require('../controllers/users');
var photosController = require('../controllers/photos');


router.route('/')
	.get(usersController.home);

router.route('/login')
	.get(usersController.login);

router.route('/login')
	.post(usersController.login);

router.route('/profile')
	.get(usersController.profile);

router.route('/logout')
	.get(usersController.logout);

//twitter routes
router.route('/auth/twitter')
	.get(usersController.twitAuth);

router.route('/auth/twitter/callback')
	.get(usersController.twitCallback);

module.exports = router;
