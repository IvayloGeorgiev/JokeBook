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
        it('should return jokes without authorization', function (done) {
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

        it('should return jokes with authorization', function (done) {
            var profile = {
                username: 'admin',
                password: '123456'
            };

            request(url)
            .post('/login')
            .send(profile)
            .end(function(err,res){
                var expectedStatus = 200;
                var actualStatus = res.status;
                actualStatus.should.equal(expectedStatus);
                request(url)
                .get('/jokes')
                .end(function (err, res) {
                	if (err) {
                    	throw err;
                	}
                	var expected = 200;
                	var actual = res.status;
                	actual.should.equal(expected);
            	});
                done();        
            });
        });

        it('should not create joke without authorization', function (done) {

            var joke = {
            	title:"joke title",
            	body:"joke content",
            	tags:["blonde"]
            }

                request(url)
                .post('/jokes')
                .send(joke)
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

        it('should not get joke by Id if Id is not defined', function (done) {
            request(url)
            .get('/jokes/asd')
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                var expectedStatus = 404;
                var actualStatus = res.status;
                actualStatus.should.equal(expectedStatus);
                done();
            });
        });
    });
});