const express = require('express');
const router = express.Router();

const INBOX_URL = 'http://localhost:5001/API/notifications/';
const LINK_VALUE = '<' + INBOX_URL + '>; rel="http://www.w3.org/ns/ldp#inbox"';

/* Discovery options (from https://www.w3.org/TR/ldn/#discovery):

 1) LINK
  a) head > Link: <http://example.org/inbox/>; rel="http://www.w3.org/ns/ldp#inbox"
  b) get  > Link: <http://example.org/inbox/>; rel="http://www.w3.org/ns/ldp#inbox"

 2) RDF
  a) JSON with relation of type http://www.w3.org/ns/ldp#inbox
  b) HTML <a> with rel="http://www.w3.org/ns/ldp#inbox"
  c) HTML <link> with rel="http://www.w3.org/ns/ldp#inbox"
  d) HTML <section> with property="http://www.w3.org/ns/ldp#inbox"
  e) text/turtle with <http://www.w3.org/ns/ldp#inbox> relation
*/

// 1) LINK
//  a) head > Link: <http://example.org/inbox/>; rel="http://www.w3.org/ns/ldp#inbox"
router.head('/', function (req, res, next) {
    res.set('Link', LINK_VALUE);
    res.status(200).end();
});

//  b) get  > Link: <http://example.org/inbox/>; rel="http://www.w3.org/ns/ldp#inbox"
router.get('/', function (req, res, next) {
    res.set('Link', LINK_VALUE);
    res.render('index', {title: 'Inbox discovery demo'});
});


// 2) RDF
router.get('/content', function (req, res, next) {
    // switch response based on Accept header and set the response content type accordingly
    res.format({
        // a) JSON with relation of type http://www.w3.org/ns/ldp#inbox
        'application/ld+json': function () {
            res.send(
                {
                    "@context": "http://www.w3.org/ns/ldp",
                    "@id": "https://tonda.solid.community/",
                    "inbox": "https://tonda.solid.community/inbox/"
                }
            )
        },

        // b) HTML <a> with rel="http://www.w3.org/ns/ldp#inbox"
        // c) HTML <link> with rel="http://www.w3.org/ns/ldp#inbox"
        // d) HTML <section> with property="http://www.w3.org/ns/ldp#inbox"
        'text/html': function () {
            res.render('contentWithRdf');
        },

        // e) text/turtle with <http://www.w3.org/ns/ldp#inbox> relation
        'text/turtle': function () {
            res.send("<https://tonda.solid.community/> <http://www.w3.org/ns/ldp#inbox> <https://tonda.solid.community/inbox/> .");
        },

        default: function () {
            // log the request and respond with 406
            res.status(406).send('Not Acceptable')
        }
    })
});

module.exports = router;
