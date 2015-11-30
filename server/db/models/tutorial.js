'use strict';
var mongoose = require('mongoose');
var requirementSchema = require('./requirementSchema');
var User = require('./user');
var _ = require('lodash');

var objectId = mongoose.Schema.Types.ObjectId;

var reviewSchema = new mongoose.Schema({
	user: {type: objectId, ref: 'User', required: true},
	rating: {type: Number, min: 1, max: 5, required: true}
});

var schema = new mongoose.Schema({
	name: {type: String, required: true},
	category: {type: objectId, ref: 'Category', required: true},
	description: {type: String, required: true},
	quantity: {type: Number, default: 1, required: true},
	requirements: [requirementSchema],
	media: {type: objectId, ref: 'Media'},
	author: {type: objectId, ref: 'User', required: true},
	steps: [{type: objectId, ref: 'Step'}],
	equipment: [{type: String}],
	reviews: [reviewSchema]

},{
	toJSON: {
		virtuals: true
	}
});

schema.virtual('avgRating').get(function(){
	var sum = _.sum(this.reviews, function(review){
		return review.rating;
	})
	if (!sum) return 0;
	return Math.round(sum/this.reviews.length)
})


schema.methods.getTotalFavorites = function(){
	return User.count({favorites: this._id}).exec()
}

schema.methods.totalPoints = function(){
	return this.upvotes.length;
}

schema.methods.totalTime = function(){
	return this.populate('steps').exec()
	.then(function(tutorial){
		var totalTime = 0;
		tutorial.steps.forEach(function(step){
			totalTime += step.activeTime + step.standByTime
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

module.exports = mongoose.model('Tutorial', schema)