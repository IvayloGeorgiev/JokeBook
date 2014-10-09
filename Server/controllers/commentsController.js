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
        function (err, joke) {
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

function deleteComment(req, res) {
    var id = req.param('id');
    var commentId = req.param('commentId');

    if (!(id && commentId)) {
        res.status(400).send('Bad request');
        return;
    }

    if (req.user.roles.indexOf('admin') < 0) {
        res.status(403).send('Operation not allowed');
        return;
    }

    Joke.findOne({_id: id},
        function (err, joke) {
            if (err) {
                res.status(404).send('Joke with this id does not exist');
                return;
            }

            var comments = joke.comments;
            var index = -1;

            for (var i = 0; i < comments.length; i++) {
                if (comments[i]._id.toString() === commentId.toString()) {
                    index = i;
                }
            }

            if (index === -1){
                res.status(404).send('Comment does not exist');
                return;
            }

            comments.splice(index, 1);
            joke.save(function (err, result) {
                if (err) {
                    res.status(400).send(err.message);
                }
                else {
                    res.send(result);
                }
            });
        })
}

module.exports = {
    createComment: createComment,
    deleteComment: deleteComment
};
