import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

function Dashboard() {
  const [userRole, setUserRole] = useState<'doctor' | 'patient' | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/auth');
          return;
        }

        
        const doctorDoc = await getDoc(doc(db, 'doctors', user.uid));
        if (doctorDoc.exists()) {
          setUserRole('doctor');
          setUserData(doctorDoc.data());
          setLoading(false);
          return;
        }

      
        const patientDoc = await getDoc(doc(db, 'patients', user.uid));
        if (patientDoc.exists()) {
          setUserRole('patient');
          setUserData(patientDoc.data());
          setLoading(false);
          return;
        }

       
        navigate('/auth');
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {userRole === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}
        </h1>
        
        {userRole === 'doctor' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, Dr. {userData?.displayName}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              This is your doctor dashboard. You can manage your appointments and patient records here.
            </p>
          </div>
        )}
        
        {userRole === 'patient' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {userData?.name || userData?.displayName}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              This is your patient dashboard. You can view your appointments and medical records here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;