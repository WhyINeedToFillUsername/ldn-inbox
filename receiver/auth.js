const API_KEY = require('../API_KEY');

const auth = {
    authorize: function (req, res, next) {
        if (req.headers.authorization !== API_KEY) {
            console.log("Unauthorized request!");
            return res.sendStatus(403);
        } else {
            next();
        }
    }
};

module.exports = auth;