var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

var Tutorial = mongoose.model('Tutorial');

router.param('tutorialId', function(req, res, next, id){
	Tutorial.findById(id).populate('steps author photos category')
	.then(function(tutorial){
		if(!tutorial) throw new Error('Tutorial not found')
			req.foundTutorial = tutorial;
			next();
	})
	.then(null, next)
})


router.get('/:tutorialId', function(req, res, next){
	res.json(req.foundTutorial)
})	

router.get('/', function(req, res, next){
	Tutorial.find().populate('photos category author')
	.then(function(tutorials){
		res.json(tutorials)
	})
	.then(null, next)
})

router.get('/search/:searchTerm', function(req, res, next){
	var searchQuery = req.params.searchTerm;
	var searchRegex = new RegExp('.*' + searchQuery + '.*', 'i')

	Tutorial.find({$or: [
		{name: searchRegex},
		{description: searchRegex}
	]})
	// .populate([
	// 	{
	// 		path: 'author',
	// 		match: {$or:[
	// 			{'author.firstName': {$regex: {searchRegex}}},
	// 			{'author.lastName': {$regex: {searchRegex}}}
	// 		]}
	// 	},
	// 	{
	// 		path: 'category',
	// 		match: {name: {$regex: {searchRegex}}}
	// 	}
	// ])
	// .execPopulate()
	.then(function(tutorial){
		res.json(tutorial)
	})
	.then(null, next)
})

router.put('/:tutorialId', function(req, res, next){
	delete req.body._id
	req.foundTutorial.set(req.body)

	req.foundTutorial.save()
	.then(function(tutorial){
		res.json(tutorial)
	})
	.then(null, next)
})

router.delete('/:tutorialId', function(req, res, next){
	req.foundTutorial.remove();
	res.sendStatus(204)
})

router.post('/', function(req, res, next){
	// delete req.body.author;
	// req.body.author = req.user._id;
	Tutorial.create(req.body)
	.then(function(tutorial){
		res.status(201).json(tutorial)
	})
	.then(null, next)
})






