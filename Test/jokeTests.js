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

    describe('Joke', function () {
        it('should return jokes', function (done) {
            request(url)
            .get('/jokes')
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                var expected = 200;
                var actual = res.status;
                actual.should.equal(expected);
                done();
            });
        });
    });
});