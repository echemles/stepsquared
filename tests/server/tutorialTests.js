var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../server/db/models');

var Tutorial = mongoose.model('Tutorial');
var Category = mongoose.model('Category');
var Step = mongoose.model('Step');
var User = mongoose.model('User');

describe('Tutorial model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Tutorial).to.be.a('function');
    });

describe('Tutorial CRUD Operations', function () {
        var theCategory;

        var createTutorial = function(){
            return Category.create({ name: 'Cooking' })
            .then(function(newCategory){
                theCategory = newCategory;
                return User.create({ 
                    email: 'obama@gmail.com', 
                    password: 'potus',
                    firstName: 'Barrack',
                    lastName: 'Obama' })
            }).then(function(newUser){
                return Tutorial.create({ name: 'Peeling Garlic', 
                    category: theCategory._id,
                    description: 'This is a description.',
                    author: newUser._id });
            })
        }

        it('should create a tutorial with all necessary values', function (done) {
            createTutorial().then(function(newTutorial){
                expect(newTutorial.category).to.be.equal(theCategory._id);
                expect(newTutorial.name).to.be.equal("Peeling Garlic")
                done();
            }).then(null, function(err){
                console.log(err)
            })
        })

        it('should throw an error if one of the required values are missing', function(done){
            var incompleteTutorial = new Tutorial();
            incompleteTutorial.validate(function(err){
                expect(err).to.be.an('object');
                expect(err.errors.author).to.exist;
                expect(err.errors.description).to.exist;
                expect(err.errors.category).to.exist;
                expect(err.errors.name).to.exist;
                expect(err.errors.name.kind).to.be.equal('required');
                done();
            })
        })

        it('should modify existing tutorials', function (done) {
            // var theTutorial;
            createTutorial().then(function(newTutorial){
                return Tutorial.findById(newTutorial._id)
            }).then(function(aTutorial){
                aTutorial.name = "Changed Tutorial Name";
                return aTutorial.save()
            }).then(function(savedTutorial){
                expect(savedTutorial.name).to.be.equal('Changed Tutorial Name');
                done();
            }).then(null, function(err){ 
                console.log(err);
            })

        })

        it('should delete a tutorial', function (done) {
            var tutorialLength;

            createTutorial().then(function(newTutorial){
                return Tutorial.find()
            }).then(function(tutorials){
                tutorialLength = tutorials.length;
                return tutorials[0].remove();
            }).then(function(removed){
                return Tutorial.find()
            }).then(function(tutorials){
                expect(tutorials.length).to.not.equal(tutorialLength);
                done();
            }).then(null, function(err){ 
                console.log(err);
            })

        })

    });

});




