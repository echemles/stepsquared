'use strict';
var router = require('express').Router();
module.exports = router;
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

//Get one user
router.get('/:user_id', function(req, res, next){
	req.userObj.populate('favorites following').execPopulate()
	.then(function(user){
		res.send(user);
	})
	.then(null, next)
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
		res.json("successfully deleted user")
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

//Add tutorial to users favorites
router.post('/:user_id/favorites/:tutorialId', function(req, res, next){
	req.userObj.update({$push: {favorites: req.params.tutorialId}})
	.then(function(response){
		res.json(response)
	})
	.then(null, next)
})

//Delete tutorial from users favorites
router.delete('/:user_id/favorites/:tutorialId', function(req, res, next){
	req.userObj.update({$pull: {favorites: req.params.tutorialId}})
	.then(function(response){
		res.json(response)
	})
	.then(null, next)
})


//Get all tutorials created by one user
router.get('/:user_id/tutorials', function(req, res, next) {
	Tutorial.find({author: req.userObj._id})
	.then(function(tutorials){ 
		res.json(tutorials)
	})
	.then(null,next);
})

//Follow someone
router.post('/:user_id/follow/:other_userid', function(req, res, next){
	console.log("in follow router")
	console.log("before save user is ", req.userObj)
	if(req.userObj.following.indexOf(req.params.other_userid) === -1) req.userObj.following.push(req.params.other_userid)
	console.log("after push user is ", req.userObj)
	req.userObj.save()
	.then(function(user){
		console.log("saved user is ", user)
		return user.populate('favorites following').execPopulate()
	})
	.then(function(user){
		res.json(user)
	})
	.then(null, next)
})

//Unfollow someone
router.delete('/:user_id/unfollow/:other_userid', function(req,res, next){
	req.userObj.following.pull(req.params.other_userid)
	req.userObj.save()
	.then(function(user){
		res.json(user)
	})
	.then(null, next)
})
