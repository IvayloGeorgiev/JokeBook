'use strict';

var usersController = require('../controllers/usersController');
var jokesController = require('../controllers/jokesController');

module.exports = {
    users: usersController,
    jokes: jokesController
};
