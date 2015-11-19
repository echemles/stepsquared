'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    tags: [String],
    type: {
        type: String, required: true, enum: {
         values: ['video','image'],
         message: "Invalid type of media"
    }},
    url: {
        type: String, required: true
    }
});



mongoose.model('Media', schema);
