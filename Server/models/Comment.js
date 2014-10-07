'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Todo: validation and user ref
var commentSchema = new mongoose.Schema({
    user: Schema.ObjectId,
    text: String,
    date: Date
});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
