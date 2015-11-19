'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var Tutorial = mongoose.model('Tutorial');

var schema = new mongoose.Schema({
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    display_name: { type: String }, //defaulting to first name in pre-save hook
    description: { type: String},
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial'}],
    password: { type: String, required: true},
    salt: { type: String },
    isAdmin: { type: Boolean, default: false },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    follwers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize =  function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    if (!display_name) {
        this.display_name = this.first_name
    }

    next();

});

schema.methods.fullName = function() {
    return this.first_name + " " + this.last_name;
}

//returns a promise for Total Points
schema.methods.getTotalPoints = function() {
    var totalpoints = 0;
    return Tutorial.find({author: this._id})
    .then(function(tutorials) {
        tutorials.forEach(function(tutorial) {
            totalponts += tutorial.totalPoints;
        })
        return totalpoints;
    })
}

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

module.exports = mongoose.model('User', schema);