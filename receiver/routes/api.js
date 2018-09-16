const express = require('express');
const router = express.Router();
const db = require('../fakeDB').fakeDB;

router.post('/notifications', function (req, res, next) {
    const msgContent = req.body.content;
    processMessage(msgContent);
    res.send('ok');//TODO send succes + location
});

router.get('/notifications', function (req, res, next) {
    //TODO set content-type json-ld / notifications or what
    res.send(db.messages);
});

module.exports = router;


function processMessage(msg) {
    db.messages.push({content: msg});
}