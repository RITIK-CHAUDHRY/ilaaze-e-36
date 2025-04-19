import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, DoctorProfile, PatientProfile } from '../types/user';
import { User } from 'firebase/auth';

export const createUserProfile = async (
  user: User,
  role: 'doctor' | 'patient',
  additionalData: Partial<DoctorProfile | PatientProfile> = {}
) => {
  const userRef = doc(db, 'users', user.uid);
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    role,
    photoURL: user.photoURL || undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...additionalData
  };

  await setDoc(userRef, {
    ...userProfile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return userProfile;
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null;
  }

  const data = userSnap.data();
  return {
    ...data,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate()
  } as UserProfile;
};

export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
}; 