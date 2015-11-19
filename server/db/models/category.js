'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    name: {
        type: String, required: true
    }
});



module.exports = mongoose.model('Category', schema);
