'use strict';
var crypto = require('crypto'); // @OB not used
var mongoose = require('mongoose');
var _ = require('lodash'); // @OB not used
var requirementSchema = require('./requirementSchema');

var objectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
	name: {type: String, required: true},
	requirements: { type: [requirementSchema], minLength: 1}, // @OB why at least one?
	number: {type: Number, default: 1},
	media: {type: objectId, ref: 'Media', required: true},
	description: {type: String, required: true, maxLength:200},
	help: [{type: objectId, ref: 'Help'}],
	activeTime: {type:Number, default: 0}, // @OB for?
	standByTime: {type: Number, default: 0} // @OB for?
});

mongoose.model('Step', schema);