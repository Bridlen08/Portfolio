# Contact Form Setup Guide

## Email Configuration

Your contact form is now fully integrated with email sending via Nodemailer and Gmail SMTP. Follow these steps to activate it:

### Step 1: Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click "Security" in the left sidebar
3. Enable 2-Step Verification (if not already enabled)
4. After enabling 2-Step Verification, you'll see "App passwords" option
5. Select "Mail" and "Windows Computer" (or choose your OS)
6. Google will generate a 16-character app-specific password
7. Copy this password - you'll need it in the next step

### Step 2: Create .env File in Backend

1. In the `backend/` directory, create a file named `.env`
2. Copy the content from `.env.example`:
   ```
   EMAIL_USER=perricpp@gmail.com
   EMAIL_PASSWORD=<your-16-character-app-password>
   PORT=5001
   ```
3. Replace `<your-16-character-app-password>` with the password from Step 1
4. Save the file

### Step 3: Start Backend Server

```bash
cd backend
npm start
```

The backend should now be running on `http://localhost:5001` with email sending enabled.

### Step 4: Test the Contact Form

1. Make sure the frontend is running (`npm run dev` in the project root)
2. Navigate to the Contact section
3. Fill in your name, email, and message
4. Click "Send Message"
5. Check your inbox (perricpp@gmail.com) for the contact message
6. Check the sender's email inbox for the confirmation message

## What Happens When Form is Submitted

1. **Frontend**: User fills form and clicks "Send"
   - Form validates: name, email required; message must be 10+ characters
   - Loading spinner shows while sending
   
2. **Backend**: POST request to `/api/contact` endpoint
   - Server validates all fields
   - Creates contact record in memory
   - Sends two emails via Gmail SMTP:
     - **Admin Email** to perricpp@gmail.com with:
       - Sender's name, email, and message
       - Time of submission
       - Professional HTML formatting
     - **Confirmation Email** to sender with:
       - Thank you message
       - Acknowledgment that you'll respond soon
   - Returns `{ success: true }` or error details

3. **Frontend**: Handles response
   - Success: Shows green confirmation message, clears form
   - Error: Shows red error message with details
   - Message auto-dismisses after 5 seconds

## Features

✅ Form validation (required fields, email format, minimum message length)
✅ XSS prevention with HTML escaping
✅ HTML-formatted professional emails
✅ Confirmation email to submitter
✅ Error handling and user feedback
✅ Loading state during submission
✅ Auto-dismissing status messages
✅ Fallback handling if email credentials not configured

## Troubleshooting

### "Network error" or "Failed to send message"
- Make sure backend is running on port 5001: `npm start` in `backend/` folder
- Check CORS is enabled (it is by default)
- Check `.env` file is properly configured

### "Failed to authenticate with Gmail"
- Verify you're using an app-specific password, not your regular Google password
- Make sure 2-Step Verification is enabled on your Google Account
- Try regenerating the app password from Google Account settings

### Backend shows warning about unconfigured credentials
- Create `.env` file in `backend/` folder with `EMAIL_USER` and `EMAIL_PASSWORD`
- Restart the backend server after adding the file

### Mail not arriving
- Check spam/junk folder
- Make sure the recipient email (perricpp@gmail.com) is correct
- Try sending a test email from backend server logs for debugging

## File Locations

- Backend server: `/backend/server.js`
- Environment example: `/backend/.env.example`
- Environment file: `/backend/.env` (create this, don't commit to git)
- Frontend contact form: `/src/app/components/Contact.tsx`
- Resume download: Served from `/public/Bridleen.resume.pdf`

## Next Steps

1. ✅ Backend setup complete (nodemailer installed and configured)
2. ✅ Frontend contact form complete (validation, error handling, feedback)
3. ✅ Resume file in public directory (ready for download)
4. 📋 Create `.env` file with your Gmail credentials
5. 📋 Test submitting a contact form to verify email delivery
6. 📋 Deploy to production (ensure environment variables are set in your hosting platform)

## Production Deployment

When deploying to production:
1. Set environment variables `EMAIL_USER` and `EMAIL_PASSWORD` in your hosting platform (Vercel, Netlify, AWS, etc.)
2. Update the frontend API endpoint from `http://localhost:5001/api/contact` to your production backend URL
3. Consider using a dedicated email service (SendGrid, Mailgun) for better reliability and deliverability
