'use strict';
var mongoose = require('mongoose');
var requirementSchema = require('./requirementSchema');

var objectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
	name: {type: String},
	requirements: { type: [requirementSchema], minLength: 1},
	number: {type: Number, default: 1},
	media: {type: objectId, ref: 'Media'},
	description: {type: String, maxLength:200},
	help: [{type: objectId, ref: 'Help'}],
	activeTime: {type:Number, default: 0},
	standByTime: {type: Number, default: 0}
});

mongoose.model('Step', schema);