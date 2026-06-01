const pool = require('../config/db');
const transporter = require('../config/email');
const path = require('path');

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

exports.submitContact = async (req, res) => {
  const { name, email, message } = req.body;
  const file = req.file; // From multer

  if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
  }
  if (message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters' });
  }

  // File path logic - store path relative to uploads/ if it exists, otherwise null
  const filePath = file ? path.join('uploads', file.filename).replace(/\\/g, '/') : null;

  try {
    // 1. Save to Database
    const [result] = await pool.query(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', 
        [name, email, message]
    );
    const contactId = result.insertId;

    // 2. Send Emails
    if (process.env.EMAIL_USER && process.env.EMAIL_USER !== 'your-email@gmail.com') {
      const attachments = [];
      if (file) {
          attachments.push({
              filename: file.originalname,
              path: file.path // Nodemailer handles reading from disk!
          });
      }

      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: 'perricpp@gmail.com',
        subject: `✉️ New Contact Form Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Message</h1>
            </div>
            <div style="padding: 32px; background: white;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151; width: 80px;">Name:</td>
                    <td style="padding: 8px 0; color: #111827;">${escapeHtml(name)}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td></tr>
              </table>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="font-weight: bold; color: #374151; margin-bottom: 8px;">Message:</p>
              <p style="color: #374151; line-height: 1.6; background: #f3f4f6; padding: 16px; border-radius: 6px; white-space: pre-wrap;">${escapeHtml(message)}</p>
              ${file ? `<p style="color: #6b7280; font-size: 13px; margin-top: 16px;">📎 File attached: <strong>${file.originalname}</strong></p>` : ''}
            </div>
            <div style="padding: 16px; background: #f9f9f9; text-align: center; color: #9ca3af; font-size: 12px;">
              Sent from your Portfolio Contact Form
            </div>
          </div>
        `,
        replyTo: email,
        attachments: attachments
      };
      
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting me!',
        html: `<p>Hi ${escapeHtml(name)},</p><p>I've received your message and will get back to you soon.</p>`
      };
      
      try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(userMailOptions);
      } catch (e) {
        console.error('Email error:', e);
      }
    }

    res.status(201).json({ success: true, id: contactId, filePath: filePath });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: 'Failed to record message' });
  }
};
