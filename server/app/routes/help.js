'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var Help = mongoose.model('Help')

router.param('helpId', function(req, res, next, id){
	Help.findById(id)
	.then(function(help){
		if(!help) throw new Error('Help not found')
		req.help = help;
		next()
	})
	.then(null, next)
})

router.get('/:helpId', function(req, res) {
	res.json(req.help);
})

router.post('/', function(req,res,next) {
	delete req.body._id
	Help.create(req.body)
	.then(function(help) {
		res.status(201).json(help);
	})
	.then(null, next);
})

router.put('/:helpId', function(req,res,next) {
	delete req.body._id;
	req.help.set(req.body);
	req.help.save()
	.then(function(help) {
		res.json(help)
	})
	.then(null, next);
})

router.delete(':/helpId', function(req,res,next) {
	req.help.remove()
	.then(function() {
		res.sendStatus(204);
	})
	.then(null, next);
})

