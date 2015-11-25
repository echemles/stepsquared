var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

var Tutorial = mongoose.model('Tutorial');

router.param('tutorialId', function(req, res, next, id){
	console.log("id is ", id)
	Tutorial.findById(id).populate('steps author media category')
	.then(function(tutorial){
		if(!tutorial) throw new Error('Tutorial not found')
			req.foundTutorial = tutorial;
			next();
	})
	.then(null, next)
})


//Get tutorials by a specific author
router.get('/user/:userId', function(req, res, next){
	Tutorial.find({author: req.params.userId}).populate('media category author')
	.then(function(tutorials){
		res.json(tutorials)
	})
	.then(null, next)
})

//Get all possible unit options for a tutorial requirement
router.get('/units', function(req,res, next){
	res.json(Tutorial.schema.path('requirements').schema.path('unit').enumValues)
})

//Get a tutorial by id
router.get('/:tutorialId', function(req, res, next){
	// req.foundTutorial.favorites.then(function(something){
	// 	console.log("something is ", something)
	// })

	req.foundTutorial.getTotalFavorites()
	.then(function(favs){
		console.log("favorites is ", favs)
		var tutorial = req.foundTutorial.toJSON()
		tutorial.favorites = favs;
		res.json(tutorial)
	})
	// req.foundTutorial.getTotalFavorites()
	// .then(function(favs){
	// 	res.foundTutorial.favorites = favs;
	// 	res.json(req.foundTutorial)
	// })
})	

//Get all tutorials
router.get('/', function(req, res, next){
	Tutorial.find().populate('media category author')
	.then(function(tutorials){

		res.json(tutorials)
	})
	.then(null, next)
})

//Search for a tutorial
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

//Update a tutorial
router.put('/:tutorialId', function(req, res, next){
	delete req.body._id
	delete req.body.__v
	req.foundTutorial.set(req.body)

	req.foundTutorial.save()
	.then(function(tutorial){
		res.json(tutorial)
	})
	.then(null, next)
})

//Delete a tutorial
router.delete('/:tutorialId', function(req, res, next){
	req.foundTutorial.remove()
	.then(function(){
		res.sendStatus(204)
	})
	.then(null, next)
})

//Add a tutorial
router.post('/', function(req, res, next){
	Tutorial.create(req.body)
	.then(function(tutorial){
		res.status(201).json(tutorial)
	})
	.then(null, next)
})

//Get the number of favorites for a tutorial
router.get('/:tutorialId/favorites', function(req, res, next){
	req.foundTutorial.getTotalFavorites()
	.then(function(favs){
		res.json(favs)
	})
	.then(null, next)
})







