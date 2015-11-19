'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	quantity: {type: Number, required: true},
	unit: {type: String, enum: ['cups', 'grams', 'ounces', 'pounds', 'feet', 'foot', 'inches', 'yards', 'tsp', 'tbsp']},
	item: {type: String, required: true}
})

module.exports = schema;