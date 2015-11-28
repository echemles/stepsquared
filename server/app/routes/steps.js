'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var Tutorial = mongoose.model('Tutorial')
var Step = mongoose.model('Step')

//Should include a tutorialID in the req.body
router.post('/', function(req, res, next){
	var createdStep;
	Step.create(req.body.step)
	.then(function(step){
		createdStep = step;
		return Tutorial.findById(req.body.tutorialId)
	})
	.then(function(tutorial){
		if(!req.body.index){
			tutorial.steps.push(createdStep._id)
			tutorial.save()
			.then(function(){
				res.status(201).send(createdStep)
			})
			
		} else{
			tutorial.steps.splice(req.body.index, 0, createdStep._id)
			tutorial.save()
			.then(function(){
				res.status(201).send(createdStep)
			})
			
		}
	})
	.then(null, next)

})

router.put('/:stepId', function(req, res, next){
	delete req.body._id
	req.step.set(req.body)
	req.step.save()
	.then(function(step){
		res.send(step)
	})
	.then(null, next)
})

router.delete('/:stepId', function(req, res, next){
	req.step.remove()
	.then(function(){
		res.sendStatus(204);
	})
	.then(null, next)
})

router.get('/:stepId', function(req, res){
	res.send(req.step)
})


router.param('stepId', function(req, res, next, id){
	Step.findById(id).populate('media').exec()
	.then(function(step){
		req.step = step;
		next()
	})
	.then(null, next)
})









