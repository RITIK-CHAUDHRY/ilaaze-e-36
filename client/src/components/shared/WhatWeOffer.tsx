

const cardsData = [
  {
    id: 1,
    image: '/src/assets/doctor.png',
    title: 'Expert Doctors',
    description: 'Consult with experienced and qualified doctors from various specialties.',
  },
  {
    id: 2,
    image: '/src/assets/react.svg',
    title: 'Easy Booking',
    description: 'Book appointments quickly and easily through our user-friendly platform.',
  },
  {
    id: 3,
    image: '/src/assets/doctor.png',
    title: '24/7 Support',
    description: 'Get round-the-clock support for your health and wellness needs.',
  },
];

const WhatWeOffer = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-700 dark:text-teal-300 mb-12">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          {cardsData.map(({ id, image, title, description }) => (
            <div
              key={id}
              className="bg-teal-50 dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={image}
                alt={title}
                className="w-20 h-20 sm:w-24 sm:h-24 mb-4 object-contain"
              />
              <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-200 mb-2">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-teal-700 dark:text-teal-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
