'use strict';
var mongoose = require('mongoose');
var _ = require('lodash'); // @OB not used

var schema = new mongoose.Schema({
    name: {
        type: String, required: true
    }
});


mongoose.model('Category', schema);
