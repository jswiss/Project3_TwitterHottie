var express          = require('express');
var router           = express.Router();
var bodyParser       = require('body-parser');
var passport         = require('passport');
var methodOverride   = require('method-override');
var usersController  = require('../controllers/users');
var photosController = require('../controllers/photos');

router.route('/')
	.get(usersController.home);

module.exports = router
