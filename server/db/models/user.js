'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var Tutorial = mongoose.model('Tutorial');
var objectId = mongoose.Schema.Types.ObjectId

var schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    display_name: { type: String }, //defaulting to first name in pre-save hook
    description: { type: String},
    favorites: [{ type: objectId, ref: 'Tutorial'}],
    password: { type: String, required: true},
    salt: { type: String },
    isAdmin: { type: Boolean, default: false },
    following: [{ type: objectId, ref: 'User'}],
    followers: [{ type: objectId, ref: 'User'}]
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

    if (!this.display_name) {
        this.display_name = this.firstName;
    }

    next();

});

schema.methods.fullName = function() {
    return this.firstName + " " + this.lastName;
}

//returns a promise for Total Points
schema.methods.getTotalPoints = function() {
    var totalpoints = 0;
    return Tutorial.find({author: this._id})
    .then(function(tutorials) {
        tutorials.forEach(function(tutorial) {
            totalpoints += tutorial.totalPoints;
        })
        return totalpoints;
    })
}

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);