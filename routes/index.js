const label = 'routes/index';

var express = require('express');
var log = global.inspector;
log.setDebug(global.config.debugLevel);

var idMiddleware = require('../middlewares/id');

var router = express.Router();



// Controllers
// ----------------------------------------------------------------------

var startController = require('../controllers/start');
var idController = require('../controllers/id');

// Middleware to use for all requests
/**
router.use(function(req, res, next) {
    // do logging
    log.info(label, 'Incoming Connection - running ' + req.originalUrl );
    next(); // make sure we go to the next routes and don't stop here
});
 **/

// Unprotected routes
// ----------------------------------------------------------------------

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/test', startController.endpointTest);

/* GET home page. */
router.get('/', startController.endpointHome);

/* Create */
router.post('/create', idMiddleware.validateAPIcall, idController.create);

/* Remove */
router.post('/remove', idMiddleware.validateAPIcall, idController.remove);

module.exports = router;




