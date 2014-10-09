var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../Server/config/config');

describe('Routing', function () {
    var url = 'http://localhost:3030';

    before(function (done) {
        if (mongoose.connection.db) {
            return done();
        }
        mongoose.connect(config.db);
        done();
    });

    describe('Like', function () {
        it('should not create like with not defined Id', function (done) {
            var vote = {
                vote:1
            }
            request(url)
            .put('/jokes/:asd/like')
            .send(vote)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                var expected = 403;
                var actual = res.status;
                actual.should.equal(expected);
                done();
            });
        });

        it('should not create like without authentication', function (done) {
            var vote = {
                vote:1
            }
            request(url)
            .put('/jokes/:5436956969aa13dc0af522af/like')
            .send(vote)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                var expected = 403;
                var actual = res.status;
                actual.should.equal(expected);
                done();
            });
        });
    });
});