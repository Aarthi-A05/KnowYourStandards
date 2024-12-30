// Import the functions you need from the Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your friend's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1skPesAVQLTy_Rh8XvNykC5I4KX8fg8Y",
  authDomain: "knowurstds.firebaseapp.com",
  projectId: "knowurstds",
  storageBucket: "knowurstds.firebasestorage.app",
  messagingSenderId: "200267247941",
  appId: "1:200267247941:web:4565d25bba9f0781bf0e2c",
  measurementId: "G-JT0F86LSP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export auth and db to use them in other files
export default app;
