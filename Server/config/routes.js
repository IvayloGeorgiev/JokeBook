'use strict';

var auth = require('./auth');
var controllers = require('../controllers');
var cors = require('express-cors');

module.exports = function (app) {
    // Enable CORS
    app.use(cors({
        allowedOrigins: [
            '*'
        ]
    }));

    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../Client/app/' + req.params.partialArea + '/' + req.params.partialName);
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    // Jokes api
    app.get('/jokes', controllers.jokes.getJokes);
    app.post('/jokes', controllers.jokes.createJoke);
    app.put('/jokes/:id', controllers.jokes.updateJoke);
    app.delete('/jokes/:id', controllers.jokes.deleteJoke);

    app.get('/api/*', function (req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};
