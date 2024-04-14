// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKBZsGvLAfH6dkJCyuOR4yaAAKDG9biLI",
  authDomain: "heart-management-app-fyp.firebaseapp.com",
  projectId: "heart-management-app-fyp",
  storageBucket: "heart-management-app-fyp.appspot.com",
  messagingSenderId: "744125561508",
  appId: "1:744125561508:web:393eb34b0dd60bd740c431",
  measurementId: "G-54QS97YBF3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


