const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-blue-200 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Main text content */}
      <div className="z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-teal-700 mb-4">
          Your Health, Our Priority
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Book appointments, consult doctors, and manage your wellness — all in one place.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-700 transition">
            Book Appointment
          </button>
          <button className="bg-white text-teal-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
            View Doctors
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
