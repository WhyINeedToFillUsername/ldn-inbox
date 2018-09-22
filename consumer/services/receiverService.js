const config = require('../config');
const db = require('../fakeDB');
const request = require('request');
const API_KEY = require('../../API_KEY');

const options = {
    url: config.INBOX_URL,
    headers: {
        'Authorization': API_KEY
    }
};

const receiverService = {

    getNotifications: function (callback) {
        const ERROR_MESSAGE = "Error retrieving messages from inbox.";
        request.get(options, function (error, response, body) {
            let notifications = null;
            let errorMessage = null;

            if (!error && response.statusCode == 200) {
                try {
                    notifications = JSON.parse(body).contains;
                } catch (e) {
                    errorMessage = ERROR_MESSAGE;
                }
            } else {
                errorMessage = ERROR_MESSAGE;
            }

            callback(errorMessage, notifications);
        });
    }
};

module.exports = receiverService;