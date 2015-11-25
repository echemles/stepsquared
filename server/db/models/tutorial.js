'use strict';
var crypto = require('crypto'); // @OB not used
var mongoose = require('mongoose');
var _ = require('lodash'); // @OB not used
var requirementSchema = require('./requirementSchema');

var objectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
	name: {type: String, required: true},
	category: {type: objectId, ref: 'Category', required: true},
	description: {type: String, required: true},
	quantity: {type: Number, default: 1, required: true}, /// @OB quantity of?
	requirements: [requirementSchema],
	media: {type: objectId, ref: 'Media'},
	author: {type: objectId, ref: 'User', required: true},
	steps: [{type: objectId, ref: 'Step'}],
	upvotes: [{type: objectId, ref: 'User'}],
	equipment: [{type: String}]

});

schema.methods.totalPoints = function(){
	return this.upvotes.length;
}

// @OB could this just be (sort of) this.activeTime() + this.standbyTime()?
schema.methods.totalTime = function(){
	return this.populate('steps').exec()
	.then(function(tutorial){
		var totalTime = 0;
		tutorial.steps.forEach(function(step){
			totalTime += step.activeTime  + step.standByTime
		})
		return totalTime
	})
}

schema.methods.activeTime = function(){
	return this.populate('steps').exec()
	.then(function(tutorial){
		var totalTime = 0;
		tutorial.steps.forEach(function(step){
			totalTime += step.activeTime 
		})
		return totalTime
	})
}

schema.methods.standbyTime = function(){
	return this.populate('steps').exec()
	.then(function(tutorial){
		var totalTime = 0;
		tutorial.steps.forEach(function(step){
			totalTime += step.standByTime 
		})
		return totalTime
	})
}

mongoose.model('Tutorial', schema)