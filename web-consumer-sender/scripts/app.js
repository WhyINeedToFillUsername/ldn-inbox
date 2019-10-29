const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const LDP = $rdf.Namespace("http://www.w3.org/ns/ldp#");

addAlert = function (level, message) {
    $("#main").prepend('<div class="alert alert-' + level + ' alert-dismissible fade show" role="alert">\n' +
        '            ' + message +
        '            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
        '                <span aria-hidden="true">&times;</span>\n' +
        '            </button>\n' +
        '        </div>');
};

function afterLogin(session) {
    // alert(`Logged in as ${session.webId}`);
    addAlert('success', 'Successfully logged in as ' + session.webId);
    $('#webId').html(session.webId);
    loadProfile(session.webId);
    // loadInbox();
    loadNotifs();
}

// register logout
function logout() {
    return solid.auth.logout()
        .then(addAlert('info', 'You have logged out.'));
}

$('#logout').click(() => logout());

async function popupLogin() {
    let session = await solid.auth.currentSession();
    let popupUri = './solid-auth-popup.html';
    if (!session) {
        session = await solid.auth.popupLogin({popupUri});
    }
    afterLogin(session);
}

function printout(data) {
    const $data = $('#data');
    const $pre = $("<pre></pre>");
    $data.append($pre);
    $pre.text(data);
    $data.append('<hr/>');
}

async function loadProfile(webId) {
    // Set up a local data store and associated data fetcher
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);

    // Load the person's data into the store
    await fetcher.load(webId);
    const profile = $rdf.sym(webId);

    // Display their details
    const fullName = store.any(profile, FOAF('name'));
    let data = fullName && 'name: ' + fullName.value;
    data += '\n';

    const inbox = store.any(profile, LDP('inbox'));
    data += inbox && 'inbox: ' + inbox.value;
    data += '\n';

    // data += 'all: ' + store;
    // data += '\n';

    printout(data);
}

async function loadInbox() {
    const webId = "https://nokton.solid.community/inbox/";

    // Set up a local data store and associated data fetcher
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);

    await fetcher.load(webId);
    const inbox = $rdf.sym(webId);

    printout(store);
}

async function loadNotification(notificationUri) {
    console.log("fetching " + notificationUri);
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);
    let options = {forceContentType: 'application/ld+json'};
    await fetcher.load(notificationUri, options);
    printout(store);
}

async function loadNotifs() {
    const uri = "https://nokton.solid.community/inbox/";
    // const uri = "http://localhost:5001/API/notifications/";

    // Set up a local data store and associated data fetcher
    const store = $rdf.graph();
    const fetcher = new $rdf.Fetcher(store);

    // fetcher.load(uri).then(resp => {
    //     printout(store);
    //     printout(store.any(undefined, LDP('contains')));
    // })

    // fetcher.nowOrWhenFetched(uri, function(ok, body, xhr) {
    //     if (!ok) console.error("Some error when fetching.");
    //     else {
    //         printout(store);
    //     }
    // });

    await fetcher.load(uri);

    const notifications = store.statementsMatching(undefined, LDP('contains'), undefined);
    for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        // printout(notification.object.uri)
        await loadNotification(notification.object.uri);
    }
}

popupLogin();