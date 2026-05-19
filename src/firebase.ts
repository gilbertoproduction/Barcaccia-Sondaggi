import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBbbWeZq0tLRDBGWYLyGg0lqHrb9wVXH4",
  authDomain: "sondaggibarcaccia.firebaseapp.com",
  projectId: "sondaggibarcaccia",
  storageBucket: "sondaggibarcaccia.firebasestorage.app",
  messagingSenderId: "314806821966",
  appId: "1:314806821966:web:6410f1dab3528220b84f1f",
  measurementId: "G-NC6QBBEW3S"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
