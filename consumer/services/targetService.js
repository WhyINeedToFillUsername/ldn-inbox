const request = require('request');
const LinkHeader = require('http-link-header');
const $rdf = require('rdflib');

const INBOX_REL_URL = 'http://www.w3.org/ns/ldp#inbox';

const targetService = {
    discoverInboxAt(urlToExplore, callback) {
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


        // 1) a) HEAD to retrieve the ldp#inbox link header
        const options = {url: urlToExplore, headers: {'Accept': "application/json"}};

        request.head(options, function (error, response, body) {
            let inboxUrl = null;

            if (!error && response.statusCode == 200) {
                try { // if we got 200 response, try to retrieve the link header with rel: inbox url value
                    let link = LinkHeader.parse(response.headers.link);
                    if (link.has('rel', INBOX_REL_URL)) {
                        inboxUrl = link.get('rel', INBOX_REL_URL)[0].uri;
                    }
                } catch (e) {
                    console.warn('Error discovering inbox: error reading response.');
                }
            } else {
                console.warn('Error discovering inbox - error requesting the submitted url.');
            }

            if (inboxUrl) {
                callback(inboxUrl);

            // 2) e) GET on the target URL to retrieve an RDF representation
            } else {
                getInboxUrlFromRDF(urlToExplore, callback);
            }
        });
    }
};

function getInboxUrlFromRDF(urlToExplore, callback) {
    const mimeType = 'text/turtle';
    const options = {url: urlToExplore, headers: {'Accept': mimeType}};

    request.get(options, function (error, response, body) {
        let inboxUrl = null;

        if (!error && response.statusCode == 200) {
            try {// if we got 200 response, try to retrieve the inbox URL from the RDF representation

                const W3 = $rdf.Namespace('http://www.w3.org/ns/');
                const store = $rdf.graph();

                // parse response body with RDF parser to the RDF store
                $rdf.parse(body, store, urlToExplore, mimeType);

                // look for ldp#inbox in the RDF triples
                let inboxNode = store.any($rdf.sym(urlToExplore), W3('ldp#inbox'));

                inboxUrl = inboxNode.uri;
            } catch (e) {
                console.warn('Error discovering inbox: error reading response.');
            }
        } else {
            console.warn('Error discovering inbox - error requesting the submitted url.');
        }

        callback(inboxUrl);
    });
}

module.exports = targetService;