/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');

var User = mongoose.model('User');
var Tutorial = mongoose.model('Tutorial');
var Category = mongoose.model('Category');
var Step = mongoose.model('Step');
var Media = mongoose.model('Media');


var seedUsers = function () {
    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            firstName: 'Omri',
            lastName: 'Bernstein',
            isAdmin: true 
        },
        {
            email: 'marth@fsa.com',
            password: 'password',
            firstName: 'Martha',
            lastName: 'Stewart' 
        }
    ]
    return User.create(users);

};

var seedTutorials = function(userId, categoryId, stepId, userId2){
    var tutorial = [
        {
            name: 'Brownies',
            description: 'This is a tutorial for the best brownies ever. They have a lot of chocolate.',
            quantity: 3,
            author: userId,
            category: categoryId,
            requirements: [
                {
                    quantity: 3,
                    unit: 'cups',
                    item: 'Sugar'
                },
                {
                    quantity: 3,
                    unit: 'feet',
                    item: 'Eggs'
                }
            ],
            steps: [stepId],
            equipment: ['Oven', 'Mixer']
        },
        {
            name: 'Brownies',
            description: 'This is a tutorial for the best brownies ever. They have a lot of chocolate.',
            quantity: 3,
            author: userId,
            category: categoryId,
            requirements: [
                {
                    quantity: 3,
                    unit: 'cups',
                    item: 'Sugar'
                },
                {
                    quantity: 3,
                    unit: 'feet',
                    item: 'Eggs'
                }
            ],
            steps: [stepId],
            equipment: ['Oven', 'Mixer']
        },
        {
            name: 'Brownies',
            description: 'This is a tutorial for the best brownies ever. They have a lot of chocolate.',
            quantity: 3,
            author: userId,
            category: categoryId,
            requirements: [
                {
                    quantity: 3,
                    unit: 'cups',
                    item: 'Sugar'
                },
                {
                    quantity: 3,
                    unit: 'feet',
                    item: 'Eggs'
                }
            ],
            steps: [stepId],
            equipment: ['Oven', 'Mixer']
        },
        {
            name: 'Brownies',
            description: 'This is a tutorial for the best brownies ever. They have a lot of chocolate.',
            quantity: 3,
            author: userId2,
            category: categoryId,
            requirements: [
                {
                    quantity: 3,
                    unit: 'cups',
                    item: 'Sugar'
                },
                {
                    quantity: 3,
                    unit: 'feet',
                    item: 'Eggs'
                }
            ],
            steps: [stepId],
            equipment: ['Oven', 'Mixer']
        },
        {
            name: 'Brownies',
            description: 'This is a tutorial for the best brownies ever. They have a lot of chocolate.',
            quantity: 3,
            author: userId2,
            category: categoryId,
            requirements: [
                {
                    quantity: 3,
                    unit: 'cups',
                    item: 'Sugar'
                },
                {
                    quantity: 3,
                    unit: 'feet',
                    item: 'Eggs'
                }
            ],
            steps: [stepId],
            equipment: ['Oven', 'Mixer']
        }
    ]
    return Tutorial.create(tutorial)
}

var seedCategories = function(){
    var category = {
        name: 'Recipes'
    }
    return Category.create(category)

}

var seedMedias = function(){
    var media = {
        name: 'How to sautee onions',
        type: 'image',
        url: 'http://www.yumuniverse.com/wp-content/uploads/2012/07/Sauteed_Rainbow_Chard_Tomato_Onions_onions1.jpg'
    }
    return Media.create(media)
}

var seedSteps = function(mediaId){
    var step = {
        name: 'Satueee onions',
        description: 'a descripton',
        requirements: [
            {
                quantity: 1, 
                unit: 'cups',
                item: 'Onion'
            },
           {
                quantity: 12, 
                unit: 'grams',
                item: 'chocolate'
            }
        ],
        media: mediaId
    }
    return Step.create(step)
}

connectToDb.then(function () {
    var user;
    var user2;
    var category;
    mongoose.connection.db.dropDatabase()
    .then(function(){
        return Promise.all([seedUsers(), seedCategories(), seedMedias()])
    })
    .then(function(values){
        user = values[0][0];
        user2 = values[0][1];
        media = values[2];
        category = values[1]
        return seedSteps(media._id)
    })
    .then(function(step){
        return seedTutorials(user._id, category._id, step._id, user2._id)
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
