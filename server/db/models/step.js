'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var requirementSchema = require('./requirementSchema');

var objectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
	name: {type: String, required: true},
	requirements: [requirementSchema],
	number: {type: Number, default: 1},
	media: {type: objectId, ref: 'Media', required: true},
	description: {type: String, required: true, maxLength:200},
	help: {type: objectId, ref: 'Help'},
	activeTime: {type:Number, default: 0},
	standByTime: {type: Number, default: 0}
});

mongoose.model('Step', schema);