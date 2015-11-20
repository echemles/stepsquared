'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    media: { type: mongoose.Schema.Types.ObjectId, ref: 'Media'}
});



mongoose.model('Help', schema);
