'use strict';

var Joke = require('../models/Joke');

function addLike(req, res) {
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

            var userId = req.user._id.toString();
            if (joke.likeIds.indexOf(userId) >= 0) {
                res.status(404).send('You already liked this joke');
                return;
            }

            if (req.body.vote !== -1 && req.body.vote != 1){
                res.stats(404).send('No vote value supplied');
                return;
            }

            joke.likes += req.body.vote;
            joke.likeIds.push(userId);
            joke.save(function (err) {
                if (err) {
                    res.status(400).send(err.message);
                }
                else {
                    res.send();
                }
            });
        }
    );
}

module.exports = {
    addLike: addLike
};
