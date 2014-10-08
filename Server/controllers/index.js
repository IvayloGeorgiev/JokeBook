'use strict';

var usersController = require('../controllers/usersController');
var jokesController = require('../controllers/jokesController');
var commentsController = require('../controllers/commentsController');

module.exports = {
    users: usersController,
    jokes: jokesController,
    comments: commentsController
};
