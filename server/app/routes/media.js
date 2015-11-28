'use strict';
var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Media = mongoose.model('Media');

router.param('mediaId', function(req, res, next, id) {
	Media.findById(id)
	.then(function(media) {
		if (!media) throw new Error('No media found')
		req.foundMedia = media;
		next();
	})
	.then(null, next)
})


//Get all media
router.get('/', function(req, res, next){
	Media.find()
	.then(function(media){
		res.json(media)
	})
	.then(null, next)
})

//Get one media
router.get('/:mediaId', function(req, res){
	res.json(req.foundMedia);
})

//Modify one media
router.put('/:mediaId', function(req, res, next){
	delete req.body._id
	req.foundMedia.set(req.body);
	req.foundMedia.save()
	.then(function(updatedMedia) {
		res.json(updatedMedia);
	})
	.then(null,next);
})

//Delete one media
router.delete('/:mediaId', function(req, res, next){
	req.foundMedia.remove()
	.then(function(){ 
		res.json("successfully deleted media")
	})
	.then(null, next);
})

//Create one media
router.post('/', function(req,res,next) {
	delete req.body._id
	Media.create(req.body)
	.then(function(media) {
		res.json(media)
	})
	.then(null,next);
})
