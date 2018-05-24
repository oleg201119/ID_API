// External Dependencies
var winston = require('winston');
var winlogger =  new (winston.Logger)({
    transports: [
        new (winston.transports.Console)()
    ]
});

winlogger.cli();

var colors = require('colors');

var httpLogger = require('morgan');

/**
 * Class definition
 */
var logger = function() {
    this.logger = winlogger;
    this.httpLogger = httpLogger;
    if (!this.level) this.level = 3;
};

logger.prototype = {
    httpLogger: null,
    logger: null,
    objDebug: null,
    level: null,

    /**
     * Returns the logger object to be used by the application
     *
     * @param str
     * @returns {Function}
     */
    getHttp: function(str) {
        return this.httpLogger(str);
    },

    /**
     * Specific function for info
     *
     * @param module
     * @param str
     * @param data
     */
    info: function(module, str, data) {
        if ( this.level > 1 ) this.logger.info(colors.blue(module)+' - '+str, data);
    },

    /**
     * Specific function for warnings
     *
     * @param module
     * @param str
     * @param data
     */
    warn: function(module, str, data) {
        if ( this.level > 0 ) this.logger.warn(colors.yellow(module)+' - '+str, data);
    },
    /**
     * Specific function for errors
     *
     * @param module
     * @param str
     * @param data
     */
    error: function(module, str, data) {
        this.logger.error(colors.red(module)+' - '+str, data);
    },

    /**
     * Set debug level for logging
     *
     * @param level
     */
    setDebug: function(level) {
        this.level = level;
    },

};

module.exports = function(module) {
    return new logger(module);
};