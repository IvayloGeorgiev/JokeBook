'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    text: String,
    date: Date
});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
