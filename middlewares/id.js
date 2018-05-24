const label = 'middlewares/id';

// Middleware methods
// ----------------------------------------------------------------------
var middleware = {};

// Middleware for validate form id
// ----------------------------------------------------------------------
middleware.validateAPIcall = function(req, res, next) {
    // check header for api key
    var apiKey = req.headers['x-api-key'];
    var appName = req.headers['x-gatekeeper-appname'];  
    var domain = req.headers['x-gatekeeper-domain']; 
    console.log("path:", req.path);
    switch(req.path) {
        case '/create': 
        case '/remove':   
            if (apiKey && appName && domain) {       
                next();             
            }
            else {
                return res.status(403).json({ message: 'Invalid API data.' });
            }
            break;
    }
    
};

// Export End
// ----------------------------------------------------------------------
module.exports = middleware;