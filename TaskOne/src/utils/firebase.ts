// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "taskme-b1252.firebaseapp.com",
  projectId: "taskme-b1252",
  storageBucket: "taskme-b1252.firebasestorage.app",
  messagingSenderId: "726918712979",
  appId: "1:726918712979:web:60120ab25c7417c7fa8766",
  measurementId: "G-CDMCL9ZQ3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);