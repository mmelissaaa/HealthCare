const twilio = require('twilio');
const config = require('../config/config');

// Initialize Twilio client
const client = twilio(config.twilioAccountSid, config.twilioAuthToken);

// Send an SMS
exports.sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: config.twilioPhoneNumber,
      to
    });
    return message.sid;
  } catch (error) {
    console.error('SMS sending error:', error);
    throw error;
  }
};