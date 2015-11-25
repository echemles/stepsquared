'use strict';
var mongoose = require('mongoose');
var _ = require('lodash'); // @OB not used

var schema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    media: { type: mongoose.Schema.Types.ObjectId, ref: 'Media'}
    // @OB upvotes, author?
});



mongoose.model('Help', schema); // @OB what is this "Help" data about/for?
