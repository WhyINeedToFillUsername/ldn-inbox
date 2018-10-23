const config = require('../config');
const db = require('../fakeDB');
const request = require('request');
const API_KEY = require('../../API_KEY');

const headers = {
    'Authorization': API_KEY,
    'Accept': "application/json"
};

const receiverService = {

    getNotifications: function (inboxUrl, callback) {
        const ERROR_MESSAGE = "Error retrieving notifications from inbox.";
        const options = {url: inboxUrl, headers: headers};

        request.get(options, function (error, response, body) {
            let notifications = null;
            let errorMessage = null;

            if (!error && response.statusCode == 200) {
                try {
                    notifications = JSON.parse(body)['ldp:contains'];
                } catch (e) {
                    errorMessage = ERROR_MESSAGE;
                }
            } else {
                console.log('Cannot access receiver!');
                errorMessage = ERROR_MESSAGE;
            }

            callback(errorMessage, notifications);
        });
    },

    getNotificationById: function (id, callback) {
        const ERROR_MESSAGE = "Error retrieving notification from inbox.";
        const options = {url: config.INBOX_URL + id, headers: headers};

        request.get(options, function (error, response, body) {
            let notification = null;
            let errorMessage = null;

            if (!error && response.statusCode == 200) {
                try {
                    notification = JSON.parse(body);
                } catch (e) {
                    errorMessage = ERROR_MESSAGE;
                }
            } else {
                console.log('Cannot access receiver!');
                errorMessage = ERROR_MESSAGE;
            }

            callback(errorMessage, notification);
        });
    }
};

module.exports = receiverService;