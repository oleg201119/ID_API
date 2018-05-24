
// Database Configuration
// ----------------------------------------------------------------------
const Mongoose = require('mongoose');
const config = global.config;

// Logger
var log = global.inspector;
const label = 'config/db';
log.setDebug(config.debugLevel);
log.info(label, 'Loading DB module!');

// MongDB Integration through Mongoose
// ----------------------------------------------------------------------
Mongoose.Promise = global.Promise;
Mongoose.connect(
    'mongodb://'+config.database.host+
    ':'+config.database.port+
    '/'+config.database.db, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
});
const db = Mongoose.connection;

// On Error Connection
// ----------------------------------------------------------------------
db.on('error', function()  {
    log.error(label, 'Connection with database error (db.js)')
});

// On Open DB Connection
// ----------------------------------------------------------------------
db.once('open', function callback() {
    log.info(label, "Connection with database /"+ config.database.db +"/ successful (db.js).");
});

// Export End
// ----------------------------------------------------------------------
exports.db = db;


