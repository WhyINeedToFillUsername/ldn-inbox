const express = require('express');
const router = express.Router();
const config = require('../config');
const notificationService = require('../service/notificationService');
const cors = require('cors');

router.post(config.NOTIFICATION_URL, function (req, res, next) {
    const notification = req.body;
    let id = notificationService.processMessage(notification);

    if (id == null) {
        res.sendStatus(400);
    } else {
        const location = config.ENDPOINT_URL + config.NOTIFICATION_URL + '/' + id;
        res.status(201).location(location).end();
    }
});

router.get(config.NOTIFICATION_URL, function (req, res, next) {
    res.type(config.CONTENT_TYPE).send(notificationService.createAllNotificationsResponse(req));
});

router.get(config.NOTIFICATION_URL + '/:notificationId', function (req, res, next) {
    let id = parseInt(req.params.notificationId);
    let notification = notificationService.getNotificationById(id);
    if (notification == null) {
        res.sendStatus(404);
    } else {
        res.type(config.CONTENT_TYPE).send(notification.content);
    }
});

var corsOptions = {origin: true}; // reflect the request origin
router.options(config.NOTIFICATION_URL, cors(corsOptions), function (req, res, next) {
    res
        .set({
            'Allow': 'GET, OPTIONS, POST',
            'Accept-Post': 'application/ld+json'
        })
        .status(200)
        .end();
});

module.exports = router;
