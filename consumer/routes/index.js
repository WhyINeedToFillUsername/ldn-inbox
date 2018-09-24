const express = require('express');
const router = express.Router();
const receiverService = require('../services/receiverService');

/* GET home page. */
router.get('/', function (req, res, next) {

    receiverService.getNotifications(function (error, notifications) {
        res.render('content/index', {
            title: 'Inbox',
            error: error,
            notifications: notifications
        });
    });
});

router.get('/notification/:notificationId', function (req, res, next) {
    const id = encodeURIComponent(req.params.notificationId);

    receiverService.getNotificationById(id, function (error, notification) {
        res.render('content/notification', {
            title: 'Inbox - notification ' + id,
            error: error,
            notification: notification
        });
    });
});

module.exports = router;
