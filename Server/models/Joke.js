'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('../models/Comment.js');

// Todo: validation and user ref
var jokeSchema = new mongoose.Schema({
    user: Schema.ObjectId,
    title: String,
    body: String,
    likes: Number,
    comments: [Comment],
    tags: [String],
    date: Date
});

var Joke = mongoose.model('Joke', jokeSchema);
module.exports = Joke;
