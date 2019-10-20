const express = require('express');
const router = express.Router();
const hbs = require('hbs');
const receiverService = require('../services/receiverService');

hbs.registerHelper('encode', function (uri) {
    return encodeURIComponent(uri);
});

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
    const notificationId = req.params.notificationId;

    receiverService.getNotificationById(notificationId, function (error, notification) {
        res.render('content/notification', {
            title: 'Inbox - detail of notification',
            id: encodeURI(notificationId),
            error: error,
            notification: notification
        });
    });
});

module.exports = router;
