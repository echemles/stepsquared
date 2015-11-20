'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Category = mongoose.model('Category')

router.param('categoryId', function(req, res, next, id){
	Category.findById(id)
	.then(function(category){
		if(!category) throw new Error('category not found')
		req.category = category;
		next()
	})
	.then(null, next)
})

router.get('/:categoryId', function(req, res, next) {
	res.json(req.category);
})

router.get('/', function(req, res, next) {
	Category.find()
	.then(function(categories) {
		res.json(categories);
	})
	.then(null, next);
})

router.post('/', function(req,res,next) {
	Category.create(req.body)
	.then(function(category) {
		res.status(201).json(category);
	})
	.then(null, next);
})

router.put('/:categoryId', function(req,res,next) {
	delete req.body._id;
	req.category.set(req.body);
	req.category.save()
	.then(function(category) {
		res.json(category)
	})
	.then(null, next);
})

router.delete('/:categoryId', function(req,res,next) {
	req.category.remove();
	res.sendStatus(204);
})

