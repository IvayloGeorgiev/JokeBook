'use strict';

var Joke = require('../models/Joke');
var Comment = require('../models/Comment');

function createComment(req, res) {
    var id = req.param('id');
    if (!id) {
        res.status(400).send('Bad request');
        return;
    }

    Joke.findOne({_id: id},
        function (err, joke){
            if (err) {
                res.status(404).send('Joke with this id does not exist');
                return;
            }

            var comment = new Comment();
            comment.user = req.user._id;
            comment.text = req.body.text;
            comment.date = new Date();
            joke.comments.push(comment);
            joke.save(function (err, result) {
                if (err) {
                    res.status(500).send(err.message);
                }
                else {
                    res.send(result);
                }
            });
        });
}

module.exports = {
    createComment: createComment
};
