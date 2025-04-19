
import React, { useState } from 'react';

interface UserProfile {
  name: string;
  dob: string;
  sex: string;
  pastIssues: string[];
  currentIssues: string[];
  medications: string[];
  emergencyContact: string;
}

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    dob: '1990-05-15',
    sex: 'Male',
    pastIssues: ['Asthma', 'High Blood Pressure'],
    currentIssues: ['Back Pain', 'Occasional Headaches'],
    medications: ['Albuterol', 'Ibuprofen'],
    emergencyContact: 'Jane Doe - 123-456-7890',
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleSave = () => {
    setUserProfile(editedProfile); 
    setIsEditing(false); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-teal-500 to-teal-700 flex items-center justify-center p-6 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-extrabold text-center text-teal-600 dark:text-teal-400">User Profile</h1>
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-teal-600 dark:text-teal-400 mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-lg text-gray-600 dark:text-gray-300">
              <p><strong className="font-medium text-gray-800 dark:text-gray-100">Name:</strong> {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-teal-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-white"
                />
              ) : userProfile.name}</p>
              <p><strong className="font-medium text-gray-800 dark:text-gray-100">Date of Birth:</strong> {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={editedProfile.dob}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-teal-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-white"
                />
              ) : userProfile.dob}</p>
              <p><strong className="font-medium text-gray-800 dark:text-gray-100">Sex:</strong> {isEditing ? (
                <input
                  type="text"
                  name="sex"
                  value={editedProfile.sex}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-teal-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-white"
                />
              ) : userProfile.sex}</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-teal-600 dark:text-teal-400 mb-6">Health Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-lg text-gray-600 dark:text-gray-300">
              <p><strong className="font-medium text-gray-800 dark:text-gray-100">Past Health Issues:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                {isEditing ? (
                  <textarea
                    name="pastIssues"
                    value={editedProfile.pastIssues.join(', ')}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-teal-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 w-full dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  userProfile.pastIssues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))
                )}
              </ul>
            </div>

            <div className="text-lg text-gray-600 dark:text-gray-300">
              <p><strong className="font-medium text-gray-800 dark:text-gray-100">Current Health Issues:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                {isEditing ? (
                  <textarea
                    name="currentIssues"
                    value={editedProfile.currentIssues.join(', ')}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-teal-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 w-full dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  userProfile.currentIssues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))
                )}
              </ul>
            </div>

            <div className="text-lg text-gray-600 dark:text-gray-300">
              <p><strong className="font-medium text-gray-800 dark:text-gray-100">Medications:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                {isEditing ? (
                  <textarea
                    name="medications"
                    value={editedProfile.medications.join(', ')}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-teal-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 w-full dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  userProfile.medications.map((med, idx) => (
                    <li key={idx}>{med}</li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-teal-600 dark:text-teal-400 mb-6">Emergency Contact</h2>
          <div className="text-lg text-gray-600 dark:text-gray-300">
            <p><strong className="font-medium text-gray-800 dark:text-gray-100">Contact Name:</strong> {isEditing ? (
              <input
                type="text"
                name="emergencyContact"
                value={editedProfile.emergencyContact}
                onChange={handleChange}
                className="mt-1 p-2 border border-teal-300 dark:border-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700 dark:text-white"
              />
            ) : userProfile.emergencyContact}</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => {
              if (isEditing) {
                handleSave(); 
              } else {
                setIsEditing(true); 
              }
            }}
            className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 transition"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
