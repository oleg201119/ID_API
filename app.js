
// Node framework dependencies
// ----------------------------------------------------------------------
var express = require('express');
var config = global.config;
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

// logger
var log = global.inspector;

const label = 'app';

// Routes
// ----------------------------------------------------------------------
var index = require('./routes/index');

// Database Configuration
// ----------------------------------------------------------------------
var db = require('./config/db');

// Initializing application
// ----------------------------------------------------------------------
var app = express();

// Logging Handler
// ----------------------------------------------------------------------
app.use(log.getHttp('dev'));
app.locals.debug = config.debug;

// Middleware
// ----------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(config.cors));

// Setting Routes
// ----------------------------------------------------------------------
app.use('/', index);

// Error Handler
// ----------------------------------------------------------------------
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error return
    log.warn(label, 'An error just broke this');
    log.warn(label, err);
    res.status(err.status || 500);
    res.json({'message':err.message});
});

// 404 Hnadler - Forward to error Handler
// ------------------------------------------pm test
// ----------------------------
app.use(function(req, res, next) {
    //var err = new Error('Not Found');
    //err.status = 404;
    //next(err);
    res.status(404);
    res.json({ message: 'Route not found!' });
});

// Export End
// ----------------------------------------------------------------------
module.exports = app;
