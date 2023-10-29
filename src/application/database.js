const admin = require("firebase-admin");

const serviceAccount = require("../../config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://syi-api-3f1e7-default-rtdb.asia-southeast1.firebasedatabase.app"
});

module.exports = admin.database();