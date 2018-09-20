let id = 0;

let notifications = [
    {id: id++, content: {from: "Harry Potter"}},
    {id: id++, content: {from: "J. K. Rowling"}},
    {id: id++, content: {from: "Petr Olšák"}},
    {id: id++, content: {from: "Borec Vráťa"}},
    {id: id++, content: {from: "Antonín Karola"}}
];

let fakeDB = {

    addNewNotification: function (notification) {
        let newId = id++;
        notifications.push({id: newId, content: notification, dateReceived: Date.now()});
        return newId;
    },

    getAllNotifications: function () {
        return notifications;
    },

    getNotificationById: function (id) {
        for (let i = 0; i < notifications.length; i++) {
            if (notifications[i].id === id) return notifications[i];
        }
        return null;
    }
};

module.exports = fakeDB;