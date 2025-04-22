const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendSMS = (to, body) => {
  client.messages
    .create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })
    .then((message) => console.log(`SMS sent: ${message.sid}`))
    .catch((err) => console.error(err));
};

module.exports = sendSMS;