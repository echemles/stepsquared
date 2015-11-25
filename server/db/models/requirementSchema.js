'use strict';
var mongoose = require('mongoose');

// @OB if you are sticking with cooking maybe make this "ingredients" instead of "requirements"
var schema = new mongoose.Schema({
	quantity: {type: Number, required: true},
	unit: {type: String, enum: ['cups', 'grams', 'ounces', 'pounds', 'feet', 'foot', 'inches', 'yards', 'tsp', 'tbsp']},
	item: {type: String, required: true}
})

module.exports = schema;