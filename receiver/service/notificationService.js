const config = require('../config');
const db = require('../fakeDB');

const ENDPOINT_FULL_URL = config.BASE_URL + config.ENDPOINT_URL + config.NOTIFICATION_URL + '/';

const notificationService = {

    processMessage: function (notification) {
        return db.addNewNotification(notification);
    },

    createAllNotificationsResponse: function (req) {
        return {
            "@context": "http://www.w3.org/ns/ldp#",
            "@id": ENDPOINT_FULL_URL,
            "@type": "ldp:Container",
            "ldp:contains": getNotificationsUrls()
        };
    },

    getNotificationById: function (id) {
        return db.getNotificationById(id);
    }
};

function getNotificationsUrls() {
    let notifs = db.getAllNotifications();
    let notificationsUrls = [];
    for (let notification of notifs) {
        notificationsUrls.push({"@id": ENDPOINT_FULL_URL + notification.id});
    }
    return notificationsUrls;
}

module.exports = notificationService;