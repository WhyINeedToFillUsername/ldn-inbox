var express = require('express');
var router = express.Router();
var db = require('../fakeDB').fakeDB;

/* GET home page. */
router.get('/', function (req, res, next) {
    // TODO GET the messages from receiver https://stackoverflow.com/questions/40497534/how-to-res-send-to-a-new-url-in-node-js-express
    res.render('index', {
        title: 'Inbox',
        messages: db.messages
    });
});

module.exports = router;
