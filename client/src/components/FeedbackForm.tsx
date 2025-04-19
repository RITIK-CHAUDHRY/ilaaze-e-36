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
        setStatusMessage('✅ Feedback sent successfully!');
        setName('');
        setEmail('');
        setSuggestions('');
      } else {
        setStatusMessage(data.message || '❌ Failed to send feedback.');
        setIsError(true);
      }
    } catch (error) {
      setStatusMessage('❌ Failed to send feedback.');
      setIsError(true);
    }
  };

  return (
    <section className="mt-12 p-6 sm:p-8 bg-gradient-to-br from-white to-teal-50 dark:from-gray-900 dark:to-gray-800 border border-teal-200 dark:border-gray-700 rounded-2xl shadow-xl max-w-2xl mx-auto transition-all duration-500">
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-700 dark:text-teal-300 mb-8 text-center tracking-wide">
        💬 We value your feedback
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-teal-900 dark:text-teal-200 mb-1">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-teal-900 dark:text-teal-200 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="suggestions" className="block text-sm font-semibold text-teal-900 dark:text-teal-200 mb-1">
            Your Suggestions
          </label>
          <textarea
            id="suggestions"
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            required
            rows={4}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 hover:shadow-lg transition duration-300"
        >
          Send Feedback
        </button>
      </form>

      {statusMessage && (
        <div className={`mt-6 text-center font-medium ${isError ? 'text-red-600 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
          {statusMessage}
        </div>
      )}
    </section>
  );
};

export default FeedbackForm;
