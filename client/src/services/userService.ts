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

  const collectionName = role === 'doctor' ? 'doctors' : 'patients';
  const userRef = doc(db, collectionName, user.uid);
  

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

  if (userSnap.exists()) {
    const data = userSnap.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate()
    } as UserProfile;
  }

  const doctorRef = doc(db, 'doctors', uid);
  const doctorSnap = await getDoc(doctorRef);

  if (doctorSnap.exists()) {
    const data = doctorSnap.data();
    return {
      ...data,
      role: 'doctor',
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date()
    } as UserProfile;
  }

  const patientRef = doc(db, 'patients', uid);
  const patientSnap = await getDoc(patientRef);

  if (patientSnap.exists()) {
    const data = patientSnap.data();
    return {
      ...data,
      role: 'patient',
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
      updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date()
    } as UserProfile;
  }

 
  return null;
};

export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
) => {

  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
   
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return;
  }
  

  const doctorRef = doc(db, 'doctors', uid);
  const doctorSnap = await getDoc(doctorRef);
  
  if (doctorSnap.exists()) {
    
    await updateDoc(doctorRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return;
  }
  
  
  const patientRef = doc(db, 'patients', uid);
  const patientSnap = await getDoc(patientRef);
  
  if (patientSnap.exists()) {
   
    await updateDoc(patientRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return;
  }
  
  
  throw new Error('User profile not found in any collection');
}; 