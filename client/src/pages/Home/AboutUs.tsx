import Navbar from '@/components/shared/Navbar';
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white text-gray-800 px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Heading */}
        <Navbar/>
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-teal-700">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Empowering health, enriching lives — learn more about our journey and values.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white shadow-md p-8 rounded-xl border-t-4 border-teal-400">
            <h2 className="text-2xl font-bold text-teal-600 mb-3">Our Mission</h2>
            <p className="text-gray-600">
              To provide high-quality, accessible healthcare solutions through modern technology,
              compassionate care, and a commitment to excellence.
            </p>
          </div>

          <div className="bg-white shadow-md p-8 rounded-xl border-t-4 border-teal-400">
            <h2 className="text-2xl font-bold text-teal-600 mb-3">Our Vision</h2>
            <p className="text-gray-600">
              To be the most trusted digital healthcare provider, connecting patients with
              professionals for better outcomes and healthier lives.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white shadow-md p-8 rounded-xl border-l-4 border-teal-500">
          <h2 className="text-2xl font-bold text-teal-600 mb-4">Core Values</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>🌟 Compassion and empathy in every interaction</li>
            <li>🛡️ Data privacy and patient confidentiality</li>
            <li>⚙️ Continuous innovation with emerging technology</li>
            <li>💬 Open communication and transparency</li>
            <li>🎯 Patient-centric care above all</li>
          </ul>
        </div>

        {/* Meet the Team */}
        <div>
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-10">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Aditi Sharma", role: "Chief Medical Officer" },
              { name: "Raj Malhotra", role: "CTO" },
              { name: "Sneha Verma", role: "Head of Operations" },
              { name: "Prateek Singh", role: "Full Stack Developer" },
              { name: "Riya Kapoor", role: "UI/UX Designer" },
              { name: "Dr. Ankur Mehra", role: "Clinical Advisor" },
            ].map((person, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-teal-400"
              >
                <h3 className="text-xl font-semibold text-gray-800">{person.name}</h3>
                <p className="text-teal-600">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-teal-600 text-white py-12 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Join us on our journey</h2>
          <p className="mb-6 text-lg">
            We’re always looking for passionate individuals to join our team and help redefine healthcare.
          </p>
          <button className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-full hover:bg-teal-100">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
