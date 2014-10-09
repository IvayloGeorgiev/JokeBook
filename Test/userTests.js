var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var winston = require('winston');
var config = require('../Server/config/config');

describe('Routing', function () {
    var url = 'http://localhost:3030';

    // create a connection with the database
    before(function (done) {

        // In our tests we use the test db
        mongoose.connect(config.db);
        done();
    });

    describe('User', function () {
        it('should create correctly new user', function (done) {
            var profile = {
                username: 'peshca',
                password: 'test',
                firstName: 'Pesho',
                lastName: 'Peshov'
            };

            request(url)
            .post('/api/users')
            .send(profile)
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

        it('should return error trying to save duplicate username', function (done) {
            var profile = {
                username: 'PeshoP',
                password: 'test',
                firstName: 'Pesho',
                lastName: 'Peshov'
            };

            request(url)
            .post('/api/users')
            .send(profile)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                var expected = 400;
                var actual = res.status;
                actual.should.equal(expected);
                done();
            });
        });

        it('should login correctly', function (done) {
            var profile = {
                username: 'PeshoP',
                password: 'test'
            };

            request(url)
            .post('/login')
            .send(profile)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                var expected = 200;
                var actual = res.status;
                var actualMsg = res.body.success;
                var expectedMsg = true;
                actual.should.equal(expected);
                actualMsg.should.equal(expectedMsg);
                done();
            });
        });

        it('should throw error on login - wrong password', function (done) {
            var profile = {
                username: 'PeshoP',
                password: 'test123'
            };

            request(url)
            .post('/login')
            .send(profile)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                var expectedStatus = 200;
                var actualStatus = res.status;
                var actualMsg = res.body.success;
                var expectedMsg = false;
                actualStatus.should.equal(expectedStatus);
                actualMsg.should.equal(expectedMsg);
                done();
            });
        });

        it('should throw error on login - wrong username', function (done) {
            var profile = {
                username: 'PeshoP123',
                password: 'test'
            };

            request(url)
            .post('/login')
            .send(profile)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                var expectedStatus = 200;
                var actualStatus = res.status;
                var actualMsg = res.body.success;
                var expectedMsg = false;
                actualStatus.should.equal(expectedStatus);
                actualMsg.should.equal(expectedMsg);
                done();
            });
        });

        it('should throw exeption on update if not authenticated', function (done) {
            var body = {
                firstName: 'Gosho',
                lastName: 'Goshov'
            };

            request(url)
            .put('/api/users')
            .send(body)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                var expectedStatus = 403;
                var actualStatus = res.status;
                actualStatus.should.equal(expectedStatus);
                done();
            });
        });

        it('should not get user by Id if Id is not defined', function (done) {
            request(url)
            .get('/api/users/asd')
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                var expectedStatus = 403;
                var actualStatus = res.status;
                actualStatus.should.equal(expectedStatus);
                done();
            });
        });

        it('should not get all users if not authenticated', function (done) {
            request(url)
            .get('/api/users')
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                var expectedStatus = 403;
                var actualStatus = res.status;
                actualStatus.should.equal(expectedStatus);
                done();
            });
        });

        it('should get all users if authenticated', function (done) {
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
                .get('/api/users')
                .end(function(err,res){  
                if (err) {
                    throw err;
                }
                var expectedStatus = 200;
                var actualStatus = res.status;
                actualStatus.should.equal(expectedStatus);
                done();       
            });
                done();        
            });
        });
    });
});