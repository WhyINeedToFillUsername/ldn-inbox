const express = require('express');
const router = express.Router();
const auth = require('solid-auth-client');

router.get('/', function (req, res, next) {

    let login = null;

    auth.trackSession(session => {
        if (!session)
            console.log('The user is not logged in');
        else {
            console.log(`The user is ${session.webId}`);
            login = session;
        }
    });


    res.render('content/testSolidAuth', {
        title: 'Test Solid Auth',
        session: login
    });
});

module.exports = router;
