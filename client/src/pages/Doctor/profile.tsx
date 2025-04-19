import React, { useState } from 'react';

const DoctorProfileUI: React.FC = () => {
  const [availability, setAvailability] = useState([
    { date: '2025-05-01', start: '09:00', end: '12:00' },
    { date: '2025-05-03', start: '14:00', end: '17:00' }
  ]);

  const [newSlot, setNewSlot] = useState({ date: '', start: '', end: '' });

  const handleAddSlot = () => {
    if (newSlot.date && newSlot.start && newSlot.end) {
      setAvailability([...availability, newSlot]);
      setNewSlot({ date: '', start: '', end: '' });
    }
  };

  const doctor = {
    name: 'Dr. Sophia Patel',
    specialization: 'Cardiologist',
    email: 'sophia.patel@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Dr. Sophia Patel has over 15 years of experience in cardiology, specializing in heart disease prevention and treatment.',
    qualifications: 'MD, FACC',
    experience: 15
  };

  const patientQueue = [
    { name: 'John Doe', problem: 'Chest pain and shortness of breath' },
    { name: 'Amit Sharma', problem: 'Irregular heartbeat and dizziness' },
    { name: 'Sarah Lee', problem: 'High blood pressure and fatigue' }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 overflow-auto">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-teal-700 dark:text-teal-400">Doctor Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-2">{doctor.name}</h2>
            <p className="text-lg text-teal-600 dark:text-teal-300 font-medium mb-3">{doctor.specialization}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{doctor.bio}</p>
            <ul className="text-gray-800 dark:text-gray-200 space-y-1 text-sm sm:text-base">
              <li><strong>🎓 Qualifications:</strong> {doctor.qualifications}</li>
              <li><strong>📅 Experience:</strong> {doctor.experience} years</li>
              <li><strong>📧 Contact:</strong> {doctor.email} | {doctor.phone}</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-200 text-center text-sm">
              Doctor Image
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Set Availability</h3>
          <form className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input
                type="date"
                className="w-full p-2 border border-teal-300 dark:border-teal-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={newSlot.date}
                onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
              <input
                type="time"
                className="w-full p-2 border border-teal-300 dark:border-teal-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={newSlot.start}
                onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
              <input
                type="time"
                className="w-full p-2 border border-teal-300 dark:border-teal-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={newSlot.end}
                onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
              />
            </div>
          </form>
          <div className="mt-4">
            <button
              onClick={handleAddSlot}
              className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 dark:hover:bg-teal-500 transition"
            >
              ➕ Add Slot
            </button>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Current Availability</h3>
          <ul className="divide-y divide-gray-300 dark:divide-gray-700">
            {availability.map((slot, idx) => (
              <li key={idx} className="py-3 flex justify-between text-gray-700 dark:text-gray-200">
                <span><strong>🗓 Slot {idx + 1}:</strong> {slot.date}</span>
                <span>⏰ {slot.start} - {slot.end}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Return Patient Queue</h3>
          <ul className="space-y-4">
            {patientQueue.map((patient, index) => (
              <li key={index} className="bg-teal-50 dark:bg-teal-900 border border-teal-200 dark:border-teal-700 p-4 rounded-lg shadow-sm">
                <p className="text-lg font-medium text-teal-800 dark:text-teal-300">👤 {patient.name}</p>
                <p className="text-gray-700 dark:text-gray-200 mt-1">🩺 {patient.problem}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileUI;
