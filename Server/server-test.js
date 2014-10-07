'use strict';

var mongoose = require('mongoose');
var config = require('./config/config');
// var Joke = require('./models/Joke');
var User = require('./models/User');
var jokesController = require('./controllers/jokesController');

mongoose.connect(config.development.db);
User.seedInitialUsers();

var joke = {
    body: {
        user: 'pesho',
        title: 'The very first joke',
        body: 'Ne sam pesho'
    }
};

jokesController.createJoke(joke,
    function(err, res){
        if (err) {
            console.log('Ooops!');
        }

        if (res) {
            console.log('Joke created');
        }
    }
);
