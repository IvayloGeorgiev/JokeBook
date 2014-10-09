'use strict';

var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User');

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        newUserData.roles = ['user'];
        newUserData.avatar = 'http://www.readingfc.co.uk/images/common/bg_player_profile_default_big.png';
        newUserData.jokes = [];

        User.create(newUserData, function (err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                res.status(400);
                res.send(false);
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                }

                res.send(user);
            });
        });
    },
    updateUser: function (req, res, next) {
        if (req.user._id.toString() === req.body._id.toString() || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;

            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }

            User.update({_id: req.body._id}, updatedUserData, function () {
                res.end();
            });
        }
        else {
            res.send({message: 'You do not have permissions!'});
        }
    },
    getAllUsers: function (req, res) {
        User.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        });
    },
    getUserById: function (req, res) {
        var id = req.param('id');
        if (!id) {
            res.status(400).send('Bad request');
            return;
        }

        User.findOne({_id: id},
            function (err, user) {
                if (err) {
                    res.status(404).send('User with this id does not exist');
                    return;
                }

                res.send(user);
            });
    }
};
