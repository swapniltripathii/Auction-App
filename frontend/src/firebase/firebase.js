// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDRTq5zXb41JZc9Y3AWIxQG2dUrMwjucMU",
  authDomain: "auctionapp-48b32.firebaseapp.com",
  projectId: "auctionapp-48b32",
  storageBucket: "auctionapp-48b32.appspot.com",
  messagingSenderId: "1061865542512",
  appId: "1:1061865542512:web:7d92002cc8a106c98435b5",
  measurementId: "G-70PM144BKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth};