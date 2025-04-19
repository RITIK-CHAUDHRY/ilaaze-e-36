const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer transporter setup - configure with your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., gmail
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});

// API endpoint to receive feedback
app.post('/api/feedback', async (req, res) => {
  const { name, email, suggestions } = req.body;

  if (!name || !email || !suggestions) {
    return res.status(400).json({ message: 'Please provide name, email, and suggestions.' });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // send to your email address
    subject: 'New Feedback Received',
    text: `Name: ${name}\nEmail: ${email}\nSuggestions: ${suggestions}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Feedback sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send feedback.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
