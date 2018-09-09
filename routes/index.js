var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Inbox',
        messages: ["Cras justo odio", "Dapibus ac facilisis in", "Porta ac consectetur ac", "Vestibulum at eros"]
    });
});

module.exports = router;
