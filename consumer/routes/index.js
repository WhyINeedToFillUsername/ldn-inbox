const express = require('express');
const router = express.Router();
const receiverService = require('../services/receiverService');

/* GET home page. */
router.get('/', function (req, res, next) {

    receiverService.getNotifications(function (error, notifications) {
        res.render('index', {
            title: 'Inbox',
            error: error,
            notifications: notifications
        });
    });
});

module.exports = router;
