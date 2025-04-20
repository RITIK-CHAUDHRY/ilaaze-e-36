import React, { useState } from 'react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    // Simulate form submission, replace this with actual form handling logic
    setTimeout(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-600 dark:text-teal-400">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We would love to hear from you! Please fill out the form below or reach us through the contact details.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-teal-50 dark:bg-teal-900 shadow-lg p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg hover:bg-teal-700 transition-all duration-300 dark:bg-teal-500 dark:hover:bg-teal-600"
            >
              {status === 'Sending...' ? 'Sending...' : 'Send Message'}
            </button>

            {status && <p className="mt-4 text-center text-lg text-teal-600 dark:text-teal-400">{status}</p>}
          </form>
        </div>

        {/* Contact Details */}
        <div className="bg-teal-50 dark:bg-teal-900 shadow-lg p-8 rounded-xl mt-12">
          <h2 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">Our Contact Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-xl text-teal-600 dark:text-teal-400">📍</span>
              <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">123 Health Avenue, Wellness City</p>
            </div>
            <div className="flex items-center">
              <span className="text-xl text-teal-600 dark:text-teal-400">📞</span>
              <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">+1 (234) 567-890</p>
            </div>
            <div className="flex items-center">
              <span className="text-xl text-teal-600 dark:text-teal-400">✉️</span>
              <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">contact@healthcare.com</p>
            </div>
            <div className="flex items-center">
              <span className="text-xl text-teal-600 dark:text-teal-400">🌐</span>
              <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">www.healthcare.com</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">Follow Us</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 text-2xl hover:text-teal-700 dark:hover:text-teal-300"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 text-2xl hover:text-teal-700 dark:hover:text-teal-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 text-2xl hover:text-teal-700 dark:hover:text-teal-300"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 text-2xl hover:text-teal-700 dark:hover:text-teal-300"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
