const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth"); // Import auth routes
require("dotenv").config();

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON requests

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Use the auth routes
app.use("/api/auth", authRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log("App is running on port " + port);
});

