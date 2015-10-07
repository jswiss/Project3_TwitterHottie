var mongoose = require('mongoose');

var userSchema = new mongoose.Schema ({
	id:      String,
	token:       String,
	displayName: String,
	username:    String,
	email:       String,
	location:    String,
	photos:      String
});

var User = mongoose.model('User', userSchema);

module.exports = User;