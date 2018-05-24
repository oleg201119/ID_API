// Required external dependencies
// ----------------------------------------------------------------------
// Libraries
var log = global.inspector;
const label  = 'controllers/start';

// Transformer
var trans = require('../transformers/responseTransformer');

exports.endpointTest = function(req, res) {
    return trans.resp('TestArrived', res);
};

exports.endpointHome = function(req, res) {
    return trans.resp('Home',res);
};

