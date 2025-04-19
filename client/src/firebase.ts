// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8WDG_Eq-XTFCu4v-cAt32c-F_lwteL8E",
  authDomain: "ilaaze-e-36-aa216.firebaseapp.com",
  projectId: "ilaaze-e-36-aa216",
  storageBucket: "ilaaze-e-36-aa216.firebasestorage.app",
  messagingSenderId: "351628849883",
  appId: "1:351628849883:web:2cbf0ed9de5709e50252fe",
  measurementId: "G-LTY9NSMJ1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();