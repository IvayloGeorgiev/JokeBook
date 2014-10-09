'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('../models/Comment.js');

// Todo: validation and user ref
var jokeSchema = new mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    title: String,
    body: String,
    likes: Number,
    likeIds: [String],
    comments: [Comment.schema],
    tags: [String],
    date: Date
});

var Joke = mongoose.model('Joke', jokeSchema);
module.exports = Joke;
