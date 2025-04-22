const sgMail = require('@sendgrid/mail');
const config = require('../config/config');

// Set SendGrid API key
sgMail.setApiKey(config.sendgridApiKey);

// Send an email
exports.sendEmail = async (to, subject, text, html = '') => {
  const msg = {
    to,
    from: config.sendgridFromEmail,
    subject,
    text,
    html
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};