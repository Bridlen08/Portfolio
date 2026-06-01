const nodemailer = require('nodemailer');
require('dotenv').config();

// DO NOT MODIFY — Explicit SMTP transport for reliable Gmail delivery
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transport on startup
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transport failed to connect:', error.message);
  } else {
    console.log('✅ Email transport ready — can send emails.');
  }
});

module.exports = transporter;
