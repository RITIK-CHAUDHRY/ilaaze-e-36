

const Footer = () => {
  return (
    <footer className="bg-teal-600 dark:bg-teal-800 text-white dark:text-gray-200 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div>
          <h3 className="text-xl font-semibold mb-3">Company</h3>
          <p className="text-sm">
            We provide the best healthcare and booking services with the help of modern technology and compassionate professionals.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/appointment" className="hover:underline">Appointments</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Online Consultation</li>
            <li>Health Records</li>
            <li>Doctor Availability</li>
            <li>Medical Suggestions</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
          <ul className="text-sm space-y-2">
            <li>Email: support@ilaaz-e-36.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: MNNIT Allahabad, India</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-sm border-t border-teal-400 pt-4">
        &copy; {new Date().getFullYear()} ilaaz-e-36 Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
