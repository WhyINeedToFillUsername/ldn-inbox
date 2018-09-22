const config = require('../config');
const db = require('../fakeDB');

const notificationService = {

    processMessage: function (notification) {
        return db.addNewNotification(notification);
    },

    createAllNotificationsResponse: function (req) {
        let appBaseUrl = getAppBaseUrl(req);
        let linksToNotifications = getNotificationsUrls(appBaseUrl);
        let response = {
            "@context": "http://www.w3.org/ns/ldp",
            "@id": "http://example.org/inbox/",
            "contains": linksToNotifications
        };
        return response;
    },

    getNotificationById: function (id) {
        return db.getNotificationById(id);
    }
};

function getAppBaseUrl(req) {
    return req.protocol + '://' + req.get('host');
}

function getNotificationsUrls(fullUrl) {
    let notifs = db.getAllNotifications();
    let location = fullUrl + config.ENDPOINT_URL + config.NOTIFICATION_URL + '/';
    let urls = notifs.map(n => location + n.id);
    return urls;
}

module.exports = notificationService;