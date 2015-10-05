var mongoose = require('mongoose');

var Tag = mongoose.model('Tag');

var photoSchema = new mongoose.Schema ({
	url: String,
	lat: Number,
	lon: Number,
	userId: String,
	screenName: String,
	tag: [Tag]
})

var Photo = mongoose.model('Photo');

module.exports = Photo;

