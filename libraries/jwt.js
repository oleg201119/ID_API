
/**
 * Constructor
 *
 * @param privateKey
 */
const label = 'library/jwt';

var config = global.config;


var jwtLibrary = function(privateKey) {
    if (privateKey) {
        this.privateKey = privateKey;
    } else {
        throw(label+' - Constructor | Error: Invalid private Key: '+ privateKey);
    }
    this.jwt = require('jsonwebtoken');
    this.logger = global.inspector;
    this.logger.info(label, 'Loading JWT!');
};
// Extending class methods
jwtLibrary.prototype = {

    privateKey: '',
    logger: null,

    isExpired: function(token) {
        this.jwt.verify(token, this.privateKey, function(err) {
            if (err) {
                return (err.name === 'TokenExpiredError');
            } else return false;
        });
    },

    isValid: function(token) {
        var validResult = this.validate(token);
        return (typeof validResult === 'object');
    },

    validate: function(token) {
        var log = this.logger;
        try {
            log.info(label, 'Validating Token: ' + token);
            var decoded = this.jwt.verify(token, this.privateKey, {ignoreExpiration: false});
            log.info(label, 'isValid Token: ' + token);
            if (typeof validResult === 'object') {
                return decoded;
            } else {
                return null;
            }
        } catch(err) {
            return err.name;
        }
    },

    decode: function(token) {
        var log = this.logger;
        log.info(label, 'Decoding token: '+token);
        return this.jwt.verify(token, this.privateKey, { ignoreExpiration: false });
    },

    create: function(tokenData) {
        return this.jwt.sign({
            exp: Math.floor(Date.now()/1000) + config.key.tokenExpiry,
            data: tokenData
        }, this.privateKey);

    }
};

module.exports = function(key) {
    return new jwtLibrary(key);
};