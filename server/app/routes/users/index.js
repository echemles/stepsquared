'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Tutorial = mongoose.model('Tutorial')

router.param('user_id', function(req, res, next) {
	User.findById(req.params.user_id)
	.then(function(user) {
		req.userObj = user;
		next();
	})
	.then(null, next)
})


//***CREATE USER IS IN AUTH ROUTER under /signup route***

//Get all users
router.get('/', function(req, res, next){
	User.find()
	.then(function(users){
		res.send(users)
	})
	.then(null, next)
})

//Ger one user
router.get('/:user_id', function(req, res, next){
	res.send(req.userObj);
})

//Modify one user
router.put('/:user_id', function(req, res, next){
	delete req.body.password;
	req.userObj.set(req.body);
	req.userObj.save()
	.then(function(updatedUser) {
		res.json(updatedUser);
	})
	.then(null,next);
})

//Delete one user
router.delete('/:user_id', function(req, res, next){
	req.userObj.remove()
	.then(function(){ 
		res.json("successfully deleted user") // @OB kind of non standard, but that could be OK
	})
	.then(null, next);
})

//Get all favorite tutorials for one user
router.get('/:user_id/favorites', function(req, res, next) {
	req.userObj.populate('favorites').execPopulate()
	.then(function(populatedUser){ 
		res.json(populatedUser.favorites);
	})
	.then(null,next);
})

//Get all tutorials created by one user
router.get('/:user_id/tutorials', function(req, res, next) {
	Tutorial.find({author: req.userObj._id}) // @OB consider indexing (zero urgency)
	.then(function(tutorials){ 
		res.json(tutorials)
	})
	.then(null,next);
})
