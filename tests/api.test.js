const chai = require('chai');
const should  = chai.should;
const expect = chai.expect;
const assert = chai.assert;

// Configuration settings
config = require('../config/settings');
// Logging
inspector = require('../libraries/logger')();
inspector.setDebug(0);
var label = 'api/test';

// Node Http Mocks
var httpMocks = require('node-mocks-http');

var util = require('util'),
    express = require('express'),
    bodyParser = require('body-parser'),
    validator = require('express-validator'),
    app = express();


var crypto =  require('crypto');

describe("Test API Call", function() {
    // Test if this is an apicall - aka does it have a key and an app name
    it("is Invalid if appName is missing from headers", function(done) {
        var req = httpMocks.createRequest({
            method: 'GET',
            url: '/test',
            headers: {'x-gatekeeper-key': 'howthisworksIamnotreallysurebuti'},
            params: {}
        });
        var res = httpMocks.createResponse();
        middleware.apicall(req, res, function(res) { return res; });
        assert.equal(res.statusCode, 403);
        done();
    });

    // Test if this is an apicall - aka does it have a key and an app name
    it("is Invalid if appKey is missing from headers", function(done) {
        var req = httpMocks.createRequest({
            method: 'GET',
            url: '/test',
            headers: {'x-gatekeeper-appname': 'sudoku'},
            params: {}
        });
        var res = httpMocks.createResponse();
        middleware.apicall(req, res, function(res) { return res; });
        assert.equal(res.statusCode, 403);
        done();
    });

});
