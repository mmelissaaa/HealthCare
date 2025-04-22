const admin = require('firebase-admin');
const config = require('../config/config');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(config.firebaseServiceAccount),
  databaseURL: config.firebaseDatabaseUrl
});

// Send a push notification
exports.sendPushNotification = async (deviceToken, title, body, data = {}) => {
  const message = {
    notification: {
      title,
      body
    },
    data,
    token: deviceToken
  };

  try {
    const response = await admin.messaging().send(message);
    return response;
  } catch (error) {
    console.error('Push notification error:', error);
    throw error;
  }
};