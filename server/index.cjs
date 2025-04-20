const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const axios = require('axios');

app.post('/api/summarize', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:8000/summarize', {
      text: req.body.text
    });
    res.json({ summary: response.data.summary });
  } catch (error) {
    console.error('Error in /api/summarize:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.response ? error.response.data : error.message });
  }
});


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


app.post('/api/feedback', async (req, res) => {
  const { name, email, suggestions } = req.body;

  if (!name || !email || !suggestions) {
    return res.status(400).json({ message: 'Please provide name, email, and suggestions.' });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, 
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
