'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	quantity: {type: Number, required: true},
	unit: {type: String, enum: ['cups', 'grams', 'ounces', 'pounds', 'feet', 'foot', 'inches', 'yards', 'tsp', 'tbsp']},
	item: {type: String, required: true}
}, {toJSON: {virtuals: true}, toObject: {virtuals: true}})

schema.virtual('unitItem')
.get(function(){
	return this.unit + "_" + this.item;
})
.set(function(unitItem){
	var split = unitItem.split('_');
	var unit = split[0];
	var item = split[1];
	this.set('unit', unit);
	this.set('item', item);
});

module.exports = schema;