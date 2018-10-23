const express = require('express');
const router = express.Router();
const receiverService = require('../services/receiverService');


router.get('/notifications', function (req, res, next) {
    let inboxUrl = req.session.currentInboxUrl;

    if (inboxUrl) {
        receiverService.getNotifications(inboxUrl, function (error, notifications) {
            res.render('content/notifications', {
                title: 'Inbox - notifications',
                error: error,
                notifications: notifications
            });
        });

    } else {
        let errors = [{msg: "Inbox URL is not set. You must discover it from a target."}];
        if (req.session.errors) errors = errors.concat(req.session.errors);

        req.session.errors = errors;
        res.redirect("/");
    }
});


router.get('/notification/:notificationId', function (req, res, next) {
    const id = encodeURIComponent(req.params.notificationId);

    receiverService.getNotificationById(id, function (error, notification) {
        res.render('content/notification', {
            title: 'Inbox - detail of notification ' + id,
            error: error,
            notification: notification
        });
    });
});

module.exports = router;
