export type UserRole = 'doctor' | 'patient';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DoctorProfile extends UserProfile {
  role: 'doctor';
  specialization?: string;
  experience?: number;
  qualifications?: string[];
}

export interface PatientProfile extends UserProfile {
  role: 'patient';
  dateOfBirth?: Date;
  gender?: string;
  bloodGroup?: string;
} 