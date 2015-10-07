var mongoose = require('mongoose');

var userSchema = new mongoose.Schema ({
	userId:      String,
	token:       String,
	displayName: String,
	username:    String,
	password:    String,
	email:       String,
	location:    String,
	photos:      String
});

var User = mongoose.model('User', userSchema);

module.exports = User;