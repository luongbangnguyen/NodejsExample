var mongoose = require('mongoose');
var FeedSchema = new mongoose.Schema({
	title: {type: String, default: ''},
	link: {type: String, default: ''},
	image: {type: String, default: ''},
	contentSnippet: {type: String, default: ''},
	content: {type: String, default: ''},
	author:	{type: String, default: ''},
	categories:	{type: Array, default: []},
	source: {type: String, default: ''},
	publishedDate: {type: Number, default: 0}
});

module.exports = mongoose.model('Feed', FeedSchema);