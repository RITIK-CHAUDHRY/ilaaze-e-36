import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DoctorProfile } from '../../types/user';
import { getUserProfile } from '../../services/userService';

export default function DoctorPublicProfile() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        if (!doctorId) {
          throw new Error('Doctor ID is required');
        }
        const profile = await getUserProfile(doctorId);
        if (!profile || profile.role !== 'doctor') {
          throw new Error('Profile not found');
        }
        setDoctor(profile as DoctorProfile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load doctor profile');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [doctorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !doctor) {
    return <div>Error: {error || 'Doctor not found'}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          {doctor.photoURL && (
            <img
              src={doctor.photoURL}
              alt={doctor.displayName}
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{doctor.displayName}</h1>
            <p className="text-gray-600">{doctor.specialization}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-gray-700">
              {doctor.experience} years of experience in {doctor.specialization}
            </p>
          </div>

          {doctor.qualifications && doctor.qualifications.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
              <ul className="list-disc list-inside">
                {doctor.qualifications.map((qualification, index) => (
                  <li key={index} className="text-gray-700">{qualification}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => window.location.href = `/appointment?doctorId=${doctor.uid}`}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 