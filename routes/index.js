var express = require('express');
var router = express.Router();
var db = require('../fakeDB').fakeDB;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Inbox',
        messages: db.messages
    });
});

module.exports = router;
