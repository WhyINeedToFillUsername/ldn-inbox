const express = require('express');
const router = express.Router();
const db = require('../fakeDB');

const NOTIFICATION_URL = '/notifications';
const ENDPOINT_URL = '/API';
const CONTENT_TYPE = 'application/ld+json';

router.post(NOTIFICATION_URL, function (req, res, next) {
    const notification = req.body;
    let id = processMessage(notification);
    const location = ENDPOINT_URL + NOTIFICATION_URL + '/' + id;
    res.status(201).location(location).end();
});

router.get(NOTIFICATION_URL, function (req, res, next) {
    //TODO send all notifications
    res.type(CONTENT_TYPE).send(createAllNotificationsResponse());
});

router.get(NOTIFICATION_URL + '/:notificationId', function (req, res, next) {
    //TODO get with id - return its json
    res.send("requested notification with id " + req.params.notificationId);
});

module.exports = router;


function processMessage(notification) {
    return db.addNewNotification(notification);
}

function getNotificationsUrls() {
    let notifs = db.getAllNotifications();
    let location = ENDPOINT_URL + NOTIFICATION_URL + '/';
    // let location = express.address() + ENDPOINT_URL + NOTIFICATION_URL + '/';
    let urls = notifs.map(n => location + n.id);
    return urls;
}

function createAllNotificationsResponse() {
    let urls = getNotificationsUrls();
    let response = {
        "@context": "http://www.w3.org/ns/ldp",
        "@id": "http://example.org/inbox/",
        "contains": urls
    }
    return response;
}

function getFullUrl(req) {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
}