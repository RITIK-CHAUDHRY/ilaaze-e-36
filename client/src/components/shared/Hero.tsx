
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    const user = localStorage.getItem('user'); 
    if (user) {
      navigate('/appointment');
    } else {
      navigate('/login');
    }
  };

  const handleAboutUs = () => {
    navigate('/aboutus');
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-500">
      
      <div className="absolute top-0 left-0 w-80 h-80 bg-teal-300 dark:bg-teal-700 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="z-10 text-center px-4 sm:px-6 md:px-10 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-teal-700 dark:text-teal-300 mb-4">
          Your Health, Our Priority
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
          Book appointments, consult doctors, and manage your wellness — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleBookAppointment}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-700 transition"
          >
            Book Appointment
          </button>
          <button
            onClick={handleAboutUs}
            className="bg-white text-teal-600 dark:bg-gray-800 dark:text-teal-300 dark:hover:bg-gray-700 px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            About Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
