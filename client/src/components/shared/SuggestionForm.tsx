import React, { useState } from 'react';

const SuggestionForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('http://localhost:5000/send-suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, suggestion }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setSuggestion('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6 mt-12 mb-12 bg-card rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-primary text-center">Any Suggestions?</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition bg-background text-foreground"
        />
        <textarea
          placeholder="Your suggestion"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          required
          rows={4}
          className="p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring transition resize-none bg-background text-foreground"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary-foreground hover:text-primary transition disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Suggestion'}
        </button>
        {status === 'success' && <p className="text-green-600 text-center">Suggestion sent successfully!</p>}
        {status === 'error' && <p className="text-destructive text-center">Failed to send suggestion. Please try again.</p>}
      </form>
    </section>
  );
};

export default SuggestionForm;
