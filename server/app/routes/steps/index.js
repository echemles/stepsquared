'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Tutorial = mongoose.model('Tutorial')
var Step = mongoose.model('Step')

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
			.then(function(tutorial){
				res.status(201).send(createdStep)
			})
			
		} else{
			tutorial.steps.splice(req.body.index, 0, createdStep._id)
			tutorial.save()
			.then(function(tutorial){
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
	.then(function(step){
		res.sendStatus(204);
	})
	.then(null, next)
})


router.param('stepId', function(req, res, next, id){
	Step.findById(id)
	.then(function(step){
		req.step = step;
		next()
	})
	.then(null, next)
})









