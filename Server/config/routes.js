'use strict';

var auth = require('./auth');
var controllers = require('../controllers');
var cors = require('express-cors');
var tags = ["army", "blonde", "children", "drunk", "gender", "general", "lawyer", "politics", "racist", "religion", "science", "sports"];

module.exports = function (app) {
    // Enable CORS
    app.use(cors({allowedOrigins: ['*']}));

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.route('/api/users')
        .get(auth.isInRole('admin'), controllers.users.getAllUsers)
        .post(controllers.users.createUser)
        .put(auth.isAuthenticated, controllers.users.updateUser);

    app.get('/api/users/:id', auth.isAuthenticated, controllers.users.getUserById);

    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../Client/app/' + req.params.partialArea + '/' + req.params.partialName);
    });

    app.get('/partials/:partialArea/:partialSubArea/:partialName', function (req, res) {
        res.render('../../Client/app/' + req.params.partialArea + '/' + req.params.partialSubArea + '/' + req.params.partialName);
    });

    app.get('/tags', function (req, res) {
        res.send(tags);
        res.end();
    });

    // Comment api
    app.post('/jokes/:id/comment', auth.isAuthenticated, controllers.comments.createComment);
    app.delete('/jokes/:id/comment/:commentId', controllers.comments.deleteComment);

    // Jokes api
    app.get('/jokes', controllers.jokes.getJokes);
    app.get('/jokes/:id', controllers.jokes.getJokeById);
    app.post('/jokes', auth.isAuthenticated, controllers.jokes.createJoke);
    app.put('/jokes/:id', auth.isAuthenticated, controllers.jokes.updateJoke);
    app.delete('/jokes/:id', auth.isAuthenticated, controllers.jokes.deleteJoke);

    // Likes api
    app.put('/jokes/:id/like', auth.isAuthenticated, controllers.likes.addLike);

    app.get('/api/*', function (req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};
