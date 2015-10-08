var mongoose = require('mongoose');

var Tag = mongoose.model('Tag');

var photoSchema = new mongoose.Schema ({
	url: String,
	user: { type: mongoose.Schema.ObjectId, ref: 'User' },
	screenName: String,
	tags: [Tag.schema]
})

var Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;

