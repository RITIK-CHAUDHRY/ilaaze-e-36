// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB6727ohfPriUp4rIQ0uNjNOefmnoJk3I",
  authDomain: "ilaaze-e-36.firebaseapp.com",
  projectId: "ilaaze-e-36",
  storageBucket: "ilaaze-e-36.firebasestorage.app",
  messagingSenderId: "784453539901",
  appId: "1:784453539901:web:649c9ffd356d3e4e62b254",
  measurementId: "G-YELCE6WB41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();