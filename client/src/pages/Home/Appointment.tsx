

const doctors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    specialization: 'Cardiologist',
    experience: '10 years',
    availableTime: '10:00 AM - 1:00 PM',
  },
  {
    id: 2,
    name: 'Dr. Arjun Mehta',
    specialization: 'Dermatologist',
    experience: '8 years',
    availableTime: '11:00 AM - 2:00 PM',
  },
  {
    id: 3,
    name: 'Dr. Ananya Verma',
    specialization: 'Pediatrician',
    experience: '5 years',
    availableTime: '12:00 PM - 3:00 PM',
  },
  {
    id: 4,
    name: 'Dr. Karan Kapoor',
    specialization: 'Neurologist',
    experience: '12 years',
    availableTime: '2:00 PM - 5:00 PM',
  },
  {
    id: 5,
    name: 'Dr. Meera Sinha',
    specialization: 'Gynecologist',
    experience: '7 years',
    availableTime: '9:00 AM - 12:00 PM',
  },
  {
    id: 6,
    name: 'Dr. Rahul Dev',
    specialization: 'Orthopedic Surgeon',
    experience: '15 years',
    availableTime: '3:00 PM - 6:00 PM',
  },
  {
    id: 7,
    name: 'Dr. Sneha Agarwal',
    specialization: 'Psychiatrist',
    experience: '9 years',
    availableTime: '10:30 AM - 1:30 PM',
  },
  {
    id: 8,
    name: 'Dr. Vinay Joshi',
    specialization: 'ENT Specialist',
    experience: '6 years',
    availableTime: '1:00 PM - 4:00 PM',
  },
  {
    id: 9,
    name: 'Dr. hemant Joshi',
    specialization: 'ENT Specialist',
    experience: '7 years',
    availableTime: '1:00 PM - 4:00 PM',
  },
];

const AppointmentPage = () => {
interface Doctor {
    id: number;
    name: string;
    specialization: string;
    experience: string;
    availableTime: string;
}

const handleAppointment = (doctor: Doctor): void => {
    alert(`Appointment started with ${doctor.name}`);
};

  return (
    <div className="min-h-screen bg-teal-50 dark:bg-gray-900 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-teal-700 dark:text-teal-300 mb-10">
        Available Doctors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-teal-500"
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              {doctor.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Specialization: <span className="font-medium">{doctor.specialization}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Experience: <span className="font-medium">{doctor.experience}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Available: <span className="font-medium">{doctor.availableTime}</span>
            </p>
            <button
              onClick={() => handleAppointment(doctor)}
              className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl shadow w-full"
            >
              Start Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentPage;
