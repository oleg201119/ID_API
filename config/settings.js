// Configuration Variables
// ----------------------------------------------------------------------
module.exports = {
    server: {
        host: 'localhost',
        port: 3000
    },
    database: {
        host: 'localhost',
        port: 27017,
        db: 'id'
    },
    key: {
        privateKey: '37LvDSm4XvjYOh9Y',
        tokenExpiry: 30 * 60 //1 hour
    },
    email: {
        username: "forextraderpt",
        password: "mmmoney5",
        verifyEmailUrl: "verifyEmail",
        resetEmailUrl: "reset"
    },
    cors: {
        'allowedHeaders': ['x-gatekeeper-key', 'Content-Type'],
        'exposedHeaders': ['x-gatekeeper-key'],
        'origin': '*',
        'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'preflightContinue': false
    },
    debugLevel: 3
};
