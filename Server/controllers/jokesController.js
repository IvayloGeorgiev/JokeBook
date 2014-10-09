'use strict';

var url = require('url');
var Joke = require('../models/Joke');

var JOKES_PER_PAGE = 10;

function createJoke(req, res) {
    if (!(req.body.title && req.body.body)) {
        res.status(400).send('Bad request');
        return;
    }

    var newJoke = new Joke();
    newJoke.user = req.user._id;
    newJoke.title = req.body.title;
    newJoke.body = req.body.body;
    newJoke.tags = req.body.tags || [];
    newJoke.likes = 0;
    newJoke.comments = [];
    newJoke.date = new Date();

    newJoke.save(function (err, result) {
        if (err) {
            res.status(500).send(err.message);
        }
        else {
            res.send(result);
        }
    });
}

function getJokes(req, res) {
    var query = url.parse(req.url, true).query;
    var currentPage = query.page || 0;

    var result = Joke.find();

    if (query.title) {
        result = result.where('title').regex(new RegExp(query.title, 'i'));
    }
    if (query.tag) {
        result = result.where('tags').in([query.tag]);
    }

    if (query.sort) {
        var orderPrefix = '-';
        if (query.orderBy && query.orderBy === 'asc') {
            orderPrefix = '';
        }
        switch (query.sort) {
            case 'likes':
                result = result.sort(orderPrefix + 'likes');
                break;
            case 'date':
                result = result.sort(orderPrefix + 'date');
                break;
            case 'user':
                result = result.sort(orderPrefix + 'user');
                break;
            default:
                res.status(400).send('Bad request');
                break;
        }
    }

    result.select({})
        .skip(JOKES_PER_PAGE * currentPage)
        .limit(JOKES_PER_PAGE)
        .populate('user', '_id username')
        .populate('comments.user', '_id username avatar')
        .exec(function (err, jokes) {
            if (err) {
                res.status(500).send(err.message);
                return;
            }

            res.send(jokes);
        });
}

function getJokeById(req, res) {
    var id = req.param('id');
    if (!id) {
        res.status(400).send('Bad request');
        return;
    }

    Joke.findOne({_id: id}).
        populate('user', '_id username').
        populate('comments.user', '_id username avatar').
        exec(function (err, joke) {
            if (err) {
                res.status(404).send('Joke with this id does not exist');
                return;
            }

            res.send(joke);
        });
}

function updateJoke(req, res) {
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

            console.log(req.body);
            joke.title = req.body.title || joke.title;
            joke.body = req.body.body || joke.body;
            joke.tags = req.body.tags || joke.tags;
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

function deleteJoke(req, res) {
    var id = req.param('id');
    if (!id) {
        res.status(400).send('Bad request');
        return;
    }

    Joke.remove({_id: id},
        function (err, joke) {
            if (err) {
                res.status(404).send('Joke with this id does not exist');
            }
            else {
                res.send();
            }
        }
    );
}

module.exports = {
    createJoke: createJoke,
    getJokes: getJokes,
    getJokeById: getJokeById,
    updateJoke: updateJoke,
    deleteJoke: deleteJoke
};
