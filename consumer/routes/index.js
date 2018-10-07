const express = require('express');
const router = express.Router();
const receiverService = require('../services/receiverService');


router.get('/', function (req, res, next) {
    receiverService.getNotifications(function (error, notifications) {
        res.render('content/index', {
            title: 'Inbox'
        });
    });
});

router.post('/discover', function (req, res, next) {
    let discoveredUrl = null;

    if (req.body.targetUrl) {
        discoveredUrl = req.body.targetUrl;
    }



    if (discoveredUrl) {
        res.redirect("/notifications");
    } else {
        res.redirect("/");
    }
});


module.exports = router;
