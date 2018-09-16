const express = require('express');
const router = express.Router();
const db = require('../../fakeDB').fakeDB;

router.post('/messages', function (req, res, next) {
    const msgContent = req.body.content;
    processMessage(msgContent);
    res.redirect('/');//TODO send succes + location
});

module.exports = router;


function processMessage(msg) {
    db.messages.push({content: msg});
}