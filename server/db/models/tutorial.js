'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var objectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
	name: {type: String, required: true},
	category: {type: objectId, ref: 'Category'},
	description: {type: String, required: true},
	quantity: {type: Number, default: 1, required: true},
	requirements: [{{type: objectId, ref: 'Requirement'}, minLength: 1}],
	//min length 1 for photos??
	photos: [{{type: objectId, ref: 'Media'}, minLength: 1}],
	author: {type: objectId, ref: 'User', required: true},
	steps: [{{type: objectId, ref: 'Step'}, minLength: 1}],
	upvotes: [{type: objectId, ref: 'User', required: true}],
	equipment: [{type: String}]

})

schema.methods.totalPoints = function(){

}

schema.methods.totalTime = function(){
	
}

schema.methods.activeTime = function(){
	
}

schema.methods.standbyTime = function(){
	
}