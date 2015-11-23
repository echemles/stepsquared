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
var Help = mongoose.model('Help');


var seedUsers = function () {
    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            firstName: 'Omri',
            lastName: 'Bernstein',
            display_name: 'Omrimaster',
            description: 'I am an instructor at fullstack academy. I have superpowers including being amazing a teaching javascript.',
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

var seedHelp = function(categoryId, mediaId){
    var help = {
        category: categoryId,
        title: 'What happens if I cooked my brownies too long?',
        description: 'Well you are shit out of luck. Chuck them in the trash and start from step 1.',
        media: mediaId
    }
    return Help.create(help)
}

var seedTutorials = function(userId, categoryId, step1Id, step2Id, userId2, media1Id){
    var tutorial = [
        {
            name: 'Brownies',
            description: 'This is a tutorial for the best brownies ever. They have a lot of chocolate and are stoft and mushy. Try to add some whipped cream on them. It tastes great:)',
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
                },
                {
                    quantity: .5,
                    unit: 'cups',
                    item: 'Butter'
                },
                {
                    quantity: 1,
                    unit: 'cups',
                    item: 'White Sugar'
                },
                {
                    quantity: 1,
                    unit: 'tsp',
                    item: 'Vanilla Extract'
                }
            ],
            steps: [step1Id, step2Id],
            equipment: ['Oven', 'Mixer'],
            media: media1Id
        },
        {
            name: 'Brownies',
            description: 'This is a tutorial for the best brownies ever. They have a lot of chocolate and are stoft and mushy. Try to add some whipped cream on them. It tastes great:)',
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
                },
                {
                    quantity: .5,
                    unit: 'cups',
                    item: 'Butter'
                },
                {
                    quantity: 1,
                    unit: 'cups',
                    item: 'White Sugar'
                },
                {
                    quantity: 1,
                    unit: 'tsp',
                    item: 'Vanilla Extract'
                }
            ],
            steps: [step1Id, step2Id],
            equipment: ['Oven', 'Mixer'],
            media1: media1Id
        },
        {
            name: 'Brownies',
            description: 'This is a tutorial for the best brownies ever. They have a lot of chocolate and are stoft and mushy. Try to add some whipped cream on them. It tastes great:)',
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
                },
                {
                    quantity: .5,
                    unit: 'cups',
                    item: 'Butter'
                },
                {
                    quantity: 1,
                    unit: 'cups',
                    item: 'White Sugar'
                },
                {
                    quantity: 1,
                    unit: 'tsp',
                    item: 'Vanilla Extract'
                }
            ],
            steps: [step1Id, step2Id],
            equipment: ['Oven', 'Mixer'],
            media1: media1Id
        },
        {
            name: 'Brownies',
            description: 'This is a tutorial for the best brownies ever. They have a lot of chocolate and are stoft and mushy. Try to add some whipped cream on them. It tastes great:)',
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
                },
                {
                    quantity: .5,
                    unit: 'cups',
                    item: 'Butter'
                },
                {
                    quantity: 1,
                    unit: 'cups',
                    item: 'White Sugar'
                },
                {
                    quantity: 1,
                    unit: 'tsp',
                    item: 'Vanilla Extract'
                }
            ],
            steps: [step1Id, step2Id],
            equipment: ['Oven', 'Mixer'],
            media1: media1Id
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
            steps: [step1Id],
            equipment: ['Oven', 'Mixer'],
            media1: media1Id
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
    var media = [
        {
            name: 'Preheat Over',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=g_fYslWqAwY'
        },
        {
            name: 'Mix dry ingredients',
            type: 'image',
            url: 'http://images.media-allrecipes.com/userphotos/720x405/1090243.jpg'
        },
        {
            name: 'How to sautee onions',
            type: 'image',
            url: 'http://www.yumuniverse.com/wp-content/uploads/2012/07/Sauteed_Rainbow_Chard_Tomato_Onions_onions1.jpg'
        }

    ]
    return Media.create(media)
}

var seedSteps = function(mediaId1, mediaId2, helpId){
    var steps = [
        {
            name: 'Preheat Oven',
            description: 'Preheat Oven to 350 degress F, Grease and flour an 8-inch square pan',
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
                },
                {
                    quantity: .5,
                    unit: 'cups',
                    item: 'Butter'
                }
            ],
            media: mediaId1,
            activeTime:15,
            standByTime: 5,
            help: [helpId]
        },
        {
            name: 'Preheat Oven',
            description: 'Preheat Oven to 350 degress F, Grease and flour an 8-inch square pan',
            requirements: [
                {
                    quantity: 1,
                    unit: 'cups',
                    item: 'White Sugar'
                },
                {
                    quantity: 1,
                    unit: 'tsp',
                    item: 'Vanilla Extract'
                }
            ],
            media: mediaId2,
            activeTime: 10,
            standByTime:20,
            help: [helpId]
        }
    ]
    return Step.create(steps)
}

connectToDb.then(function () {
    var user;
    var user2;
    var category;
    var media1;
    var media2;
    var step1;
    var step2;
    var help;
    mongoose.connection.db.dropDatabase()
    .then(function(){
        return Promise.all([seedUsers(), seedCategories(), seedMedias()])
    })
    .then(function(values){
        user = values[0][0];
        user2 = values[0][1];
        media1 = values[2][0];
        media2 = values[2][1];
        category = values[1]
        return seedHelp(category._id, media1._id)
    })
    .then(function(_help){
        help = _help
        return seedSteps(media1._id, media2._id, help._id)
    })
    .then(function(steps){
        step1 = steps[0]
        step2 = steps[1]
        return seedTutorials(user._id, category._id, step1._id, step2._id, user2._id, media1._id)
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
