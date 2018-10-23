const express = require('express');
const router = express.Router();

const INBOX_URL = 'http://localhost:5001/API/notifications/';
const LINK_VALUE = '<' + INBOX_URL + '>; rel="http://www.w3.org/ns/ldp#inbox"';

/* TODO https://www.w3.org/TR/ldn/#discovery:

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

/* GET home page. */
router.get('/', function (req, res, next) {
    res.set('Link', LINK_VALUE);
    res.render('index', {title: 'Inbox discovery demo'});
});

router.head('/', function (req, res, next) {
    res.set('Link', LINK_VALUE);
    res.status(200).end();
});

module.exports = router;
