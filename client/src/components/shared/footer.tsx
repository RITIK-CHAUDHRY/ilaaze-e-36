const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Tagline */}
          <div>
            <h1 className="text-2xl font-bold text-teal-400">Ilaaz-e-36</h1>
            <p className="mt-2 text-sm text-gray-400">
              Your digital partner for smart and accessible healthcare.
            </p>
          </div>
  
          {/* Links */}
          <div>
            <h2 className="text-lg font-semibold text-teal-300 mb-4">Quick Links</h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-teal-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Services</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Doctors</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-teal-400 transition">Privacy Policy</a></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold text-teal-300 mb-4">Contact Us</h2>
            <p className="text-gray-400 text-sm">
              Email: <a href="mailto:support@ilaaz36.com" className="text-teal-400 hover:underline">support@ilaaz36.com</a>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Phone: <a href="tel:+911234567890" className="text-teal-400 hover:underline">+91 12345 67890</a>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Address: 36 Wellness St, HealthCity, India
            </p>
          </div>
        </div>
  
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © 2025 Ilaaz-e-36. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  