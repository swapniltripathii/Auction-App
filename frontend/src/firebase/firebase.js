// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage

const firebaseConfig = {
  apiKey: "AIzaSyCFG3T7w1ymuyxW7vM9JAvXunP9TMDTjic",
  authDomain: "auction-app-2d0e7.firebaseapp.com",
  projectId: "auction-app-2d0e7",
  storageBucket: "auction-app-2d0e7.appspot.com",
  messagingSenderId: "765880756346",
  appId: "1:765880756346:web:bae4b1ef3a72c0e07f73c3",
  measurementId: "G-5H1RB33BKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Storage

export { app, auth, firestore, storage };
