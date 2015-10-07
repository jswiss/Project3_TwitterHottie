var mongoose = require('mongoose');

var userSchema = new mongoose.Schema ({
	twitter: {
		id:      String,
		token:       String,
		displayName: String,
		username:    String
	}
});

var User = mongoose.model('User', userSchema);

module.exports = User;