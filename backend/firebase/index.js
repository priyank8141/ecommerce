var admin = require("firebase-admin");

var serviceAccount = require("../config/fbAdminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
