const config = require('../config');
const db = require('../fakeDB');

const ENDPOINT_FULL_URL = config.BASE_URL + config.ENDPOINT_URL + config.NOTIFICATION_URL + '/';

const notificationService = {

    processMessage: function (notification) {
        // TODO apply constrains and checks on the message (e.g. valid json, has @context ActivityStreams etc.)
        // if @context not present, assume '"@context": "https://www.w3.org/ns/activitystreams",'
        return db.addNewNotification(notification);
    },

    createAllNotificationsResponse: function () {
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