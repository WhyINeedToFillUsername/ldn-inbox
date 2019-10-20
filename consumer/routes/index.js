const express = require('express');
const router = express.Router();

const receiverService = require('../services/receiverService');
const targetService = require("../services/targetService");

const DEFAULT_INBOX_URI = ['http://localhost:3000/'];

router.get('/', function (req, res, next) {

    let usedInboxUrls = DEFAULT_INBOX_URI;
    if (req.session.usedInboxUrls) usedInboxUrls = usedInboxUrls.concat(req.session.usedInboxUrls);

    res.render('content/index', {
        title: 'Inbox',
        errors: req.session.errors,
        usedInboxUrls: usedInboxUrls
    });
    req.session.errors = null;
});

router.post('/discover', function (req, res, next) {
    if (req.body.targetUrl && req.body.targetUrl.trim()) { // submitted url - try to discover inbox there
        targetService.discoverInboxAt(req.body.targetUrl.trim(), callback(req, res));
    }
});

function callback(req, res) {
    return function processDiscoveredTarget(discoveredUrl) {
        if (discoveredUrl) {

            let usedInboxUrls = [discoveredUrl];
            if (req.session.usedInboxUrls) usedInboxUrls = usedInboxUrls.concat(req.session.usedInboxUrls);

            req.session.usedInboxUrls = usedInboxUrls;
            req.session.currentInboxUrl = discoveredUrl;
            res.redirect("/notifications");
        } else {
            const ERROR_MESSAGE = "Error discovering inbox: wrong URL or the URL does not contain any inbox link.";
            let errors = [{msg: ERROR_MESSAGE}];
            if (req.session.errors) errors = errors.concat(req.session.errors);

            req.session.errors = errors;
            res.redirect("/");
        }
    }
}

module.exports = router;
