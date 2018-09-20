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
    res.type(CONTENT_TYPE).send(createAllNotificationsResponse(req));
});

router.get(NOTIFICATION_URL + '/:notificationId', function (req, res, next) {
    let id = parseInt(req.params.notificationId);
    let notification = db.getNotificationById(id);
    if (notification == null) {
        res.sendStatus(400);
    } else {
        res.type(CONTENT_TYPE).send(notification.content);
    }
});

module.exports = router;


function processMessage(notification) {
    return db.addNewNotification(notification);
}

function getNotificationsUrls(fullUrl) {
    let notifs = db.getAllNotifications();
    let location = fullUrl + ENDPOINT_URL + NOTIFICATION_URL + '/';
    let urls = notifs.map(n => location + n.id);
    return urls;
}

function createAllNotificationsResponse(req) {
    let appBaseUrl = getAppBaseUrl(req);
    let linksToNotifications = getNotificationsUrls(appBaseUrl);
    let response = {
        "@context": "http://www.w3.org/ns/ldp",
        "@id": "http://example.org/inbox/",
        "contains": linksToNotifications
    };
    return response;
}

function getAppBaseUrl(req) {
    return req.protocol + '://' + req.get('host');
}