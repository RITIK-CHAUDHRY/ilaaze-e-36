import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'doctor' | 'patient';
  
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
       
        const doctorDocRef = doc(db, 'doctors', firebaseUser.uid);
        const patientDocRef = doc(db, 'patients', firebaseUser.uid);
        
        const [doctorSnap, patientSnap] = await Promise.all([
          getDoc(doctorDocRef),
          getDoc(patientDocRef)
        ]);

        if (doctorSnap.exists()) {
          setUserProfile({ ...doctorSnap.data(), role: 'doctor' } as UserProfile);
        } else if (patientSnap.exists()) {
          setUserProfile({ ...patientSnap.data(), role: 'patient' } as UserProfile);
        } else {
          
          setUserProfile(null);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);