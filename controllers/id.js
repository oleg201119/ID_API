// Required external dependencies
// ----------------------------------------------------------------------
var Promise = require('bluebird');
// Libraries
var jwtLibrary = require('../libraries/jwt')(global.config.key.privateKey);
var libCrypt = require('../libraries/crypt')(global.config.key.privateKey);
// this makes sure it waits for resolution of jwtlibrary and libCrypt
Promise.promisifyAll(jwtLibrary);
Promise.promisifyAll(libCrypt);

// Models
var ID = require('../models/id');

// Transformer
var trans = require('../transformers/responseTransformer');

// Auxiliary
var validator = require('validator');
var email = require('email-validation');

// Logger
var log = global.inspector;
const label  = 'controllers/id';

var crypto =  require('crypto');

// Generate a v1 UUID (time-based)
const uuidV1 = require('uuid/v1');

/**
 * Create
 */
exports.create = function(req, res) {

    if(!req.apikey || !req.appname || !req.domain) {        
        req.apikey = req.headers['x-api-key'];
        req.appname = req.headers['x-gatekeeper-appname'];
        req.domain = req.headers['x-gatekeeper-domain'];
    }

    req.uuid = uuidV1();

    /**
     * Do the registration of a new id
     *
     * @param res
     * @param req
     */
    function createNewID(res, req) {        
        var data;
        var confirmToken = req.body.userID;
        console.log("create:" + libCrypt.cipher(req.body.userID, req.apikey));
                  
        data = {
            uuid: req.uuid,
            userid: libCrypt.cipher(req.body.userID, req.apikey),
            fname: libCrypt.cipher(req.body.fname, req.apikey),
            lname: libCrypt.cipher(req.body.lname, req.apikey),
            mnames: libCrypt.cipher(req.body.mnames, req.apikey),
            gender: libCrypt.cipher(req.body.gender, req.apikey),
            photo: libCrypt.cipher(req.body.photo, req.apikey),
            address: libCrypt.cipher(req.body.address, req.apikey),
            idcard: libCrypt.cipher(req.body.idcard, req.apikey),
            driverlic: libCrypt.cipher(req.body.driverlic, req.apikey),
            passport: libCrypt.cipher(req.body.passport, req.apikey)
        };
        
        ID.create(data,
            function(id) {                
                return trans.resp('CreateIDSuccessful', res, { uuid: id.uuid });
            },
            function(err) {
                return trans.resp('ExecutionError', res, err);
            }
        );
    }

    var err = [];
    // Validation of the inputs
    if (!validator.isByteLength(req.body.userID, {min: 5})) {
        err[err.length] = 'userID must be at least 5 chars long!';
    }
    if (!validator.isByteLength(req.body.fname, {min: 1})) {
        err[err.length] = 'First name must be at least 1 chars long!';
    }
    if (!validator.isByteLength(req.body.lname, {min: 1})) {
        err[err.length] = 'Last name must be at least 1 chars long!';
    }
    if (!validator.isByteLength(req.body.photo, {min: 1})) {
        err[err.length] = 'photo must be exist.';
    }

    switch(req.body.gender) {
        case 'mr':    
        case 'mrs':
        case 'miss':            
            break;
        default:
            err[err.length] = 'Gender must be is mr, mrs or miss.';
            break;
    }

    // Get the validation result whenever you want
    if (err.length>0) {
        return trans.resp('InputValidationErrors', res, {errors: err });
    }

    // Check if already exists
    var encIdentity = libCrypt.cipher(req.body.userID, req.apikey);    
    console.log("create:" + libCrypt.cipher(req.body.userID, req.apikey));
    ID.findIDByIdentity (
        encIdentity,
        function (id) {
            if(id) {
                return trans.resp('IDAlreadyExists', res);
            }
            else {
                return createNewID(res, req );
            }
        },
        function(err) {
            if (err) {
                return trans.resp('ExecutionError', res, err);
            }
        }
    );
};

/**
 * Remove
 */
exports.remove = function(req, res) {
    
    if(!req.apikey || !req.appname || !req.domain) {        
        req.apikey = req.headers['x-api-key'];
        req.appname = req.headers['x-gatekeeper-appname'];
        req.domain = req.headers['x-gatekeeper-domain'];
    }

    var err = [];
    // Validation of the inputs
    if (!validator.isByteLength(req.body.userID, {min: 5})) {
        err[err.length] = 'userID must be at least 5 chars long!';
    }

    // Get the validation result whenever you want
    if (err.length>0) {
        return trans.resp('InputValidationErrors', res, {errors: err });
    }

    // Check if already exists
    var encIdentity = libCrypt.cipher(req.body.userID, req.apikey);    
    console.log("remove:" + libCrypt.cipher(req.body.userID, req.apikey));
    ID.findIDByIdentity (
        encIdentity,
        function (id) {
            if(id) {
                ID.remove (
                    encIdentity,
                    function(id) {                
                        return trans.resp('RemoveIDSuccessful', res);
                    },
                    function(err) {
                        return trans.resp('ExecutionError', res, err);
                    }
                );
            }
            else {
                return trans.resp('IDNotFound', res);
            }
        },
        function(err) {
            if (err) {
                return trans.resp('ExecutionError', res, err);
            }
        }
    );

};