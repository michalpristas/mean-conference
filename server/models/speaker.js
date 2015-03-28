// schema for speaker

// import modules
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// init data types
var SpeakerSchema = new Schema({
	name: {type: String, default: ''},
	company: {type: String, default: ''},
	title: {type: String, default: ''},
	description: {type: String, default: ''},
	picture: {type: String, default: ''},
	schedule: {type: String, default: ''}, 
	created: {type: Date, default: Date.now}, 
});

// make schema public
module.exports = mongoose.model("Speaker", SpeakerSchema);