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
            "@context": "http://www.w3.org/ns/ldp#",
            "@id": appBaseUrl + config.ENDPOINT_URL + config.NOTIFICATION_URL,
            "@type": "ldp:Container",
            "ldp:contains": linksToNotifications
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
    let notificationsUrls = [];
    for (let notif of notifs) {
        notificationsUrls.push({"@id": location + notif.id});
    }
    return notificationsUrls;
}

module.exports = notificationService;