// common config
let config = {
    ACCEPTED_CONTENT_TYPES: [
        "application/json",
        "application/ld+json",
        "application/activity+json"
    ],

    CONTENT_TYPE: 'application/ld+json',

    APP_PORT: '5001',
    ENDPOINT_URL: '/API',
    NOTIFICATION_URL: '/notifications'
};

// environment-specific
switch (process.env.NODE_ENV) {
    case 'production':
        config.BASE_URL = 'https://receiver.ldn.opendata.cz';
        break;

    default:
    case 'development':
        config.BASE_URL = 'http://localhost:5001';
        break;
}

module.exports = config;