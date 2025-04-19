import React, { useState } from 'react';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    setIsError(false);

    if (!name || !email || !suggestions) {
      setStatusMessage('Please fill in all fields.');
      setIsError(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, suggestions }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('Feedback sent successfully!');
        setName('');
        setEmail('');
        setSuggestions('');
      } else {
        setStatusMessage(data.message || 'Failed to send feedback.');
        setIsError(true);
      }
    } catch (error) {
      setStatusMessage('Failed to send feedback.');
      setIsError(true);
    }
  };

  return (
    <section className="mt-8 p-6 border-t border-gray-300 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-teal-700 mb-6 text-center">Send Feedback</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="name" className="text-teal-800 font-medium">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <label htmlFor="email" className="text-teal-800 font-medium">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <label htmlFor="suggestions" className="text-teal-800 font-medium">Suggestions:</label>
        <textarea
          id="suggestions"
          value={suggestions}
          onChange={(e) => setSuggestions(e.target.value)}
          required
          rows={4}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
        />

        <button
          type="submit"
          className="bg-teal-600 text-white font-semibold py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
        >
          Send Feedback
        </button>
      </form>
      {statusMessage && (
        <p className={`mt-4 text-center ${isError ? 'text-red-600' : 'text-green-600'}`}>
          {statusMessage}
        </p>
      )}
    </section>
  );
};

export default FeedbackForm;
