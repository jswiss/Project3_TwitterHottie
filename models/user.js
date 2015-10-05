var mongoose = require('mongoose');

var Photo = mongoose.model('Photo');

var userSchema = new mongoose.Schema ({
	userId: String,
	username: String,
	password: String,
	email: String,
	location: String,
	photos: { type: mongoose.Schema.ObjectId, ref: 'Photo' }
});

var User = mongoose.model('User', userSchema);

module.exports = User;