import React, { useEffect, useState } from 'react';

const cardsData = [
  {
    id: 1,
    image: '/src/assets/doctor.png', // example image path, adjust as needed
    title: 'Expert Doctors',
    description: 'Consult with experienced and qualified doctors from various specialties.',
  },
  {
    id: 2,
    image: '/src/assets/react.svg', // example image path, adjust as needed
    title: 'Easy Booking',
    description: 'Book appointments quickly and easily through our user-friendly platform.',
  },
  {
    id: 3,
    image: '/src/assets/doctor.png', // example image path, adjust as needed
    title: '24/7 Support',
    description: 'Get round-the-clock support for your health and wellness needs.',
  },
];

// Text writing animation component for heading
const AnimatedHeading = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return (
      <h2 className="text-3xl md:text-5xl font-bold text-teal-700 mb-8 min-h-[3rem]">
      {displayedText}
      <span className="blinking-cursor" style={{
        fontWeight: 100,
        fontSize: '2rem',
        color: '#2c7a7b',
        animation: 'blink 1s infinite'
      }}>|</span>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </h2>
  );
};

const WhatWeOffer = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <AnimatedHeading text="What We Offer" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardsData.map(({ id, image, title, description }) => (
            <div
              key={id}
              className="bg-teal-50 rounded-lg shadow p-6 flex flex-col items-center"
            >
              <img src={image} alt={title} className="w-24 h-24 mb-4 object-contain" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">{title}</h3>
              <p className="text-teal-700">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
