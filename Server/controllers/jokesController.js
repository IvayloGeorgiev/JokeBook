'use strict';

var mongoose = require('mongoose');
var Joke = require('../models/Joke');
var Comment = require('../models/Comment');

/*
 joke: {
 user: String,
 title: String,
 body: String,
 tags: [String]
 }
*/
function createJoke(joke, cb) {
    // Todo: verify user
    var newJoke = new Joke();
    newJoke.user = '54340f7a229c96ec11a90851';
    newJoke.title = joke.title;
    newJoke.body = joke.body;
    newJoke.tags = joke.tags;
    newJoke.likes = 0;
    newJoke.comments = [];
    newJoke.date = new Date();

    newJoke.save(cb);
}

module.exports = {
    createJoke: createJoke
};
