// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyAlpqSaXFke3v7UBBZdakB9Ky8Ydi3L3y0",
  authDomain: "findmystay-faizan7.firebaseapp.com",
  projectId: "findmystay-faizan7",
  storageBucket: "findmystay-faizan7.firebasestorage.app",
  messagingSenderId: "1039681720631",
  appId: "1:1039681720631:web:1e690faf8a17cc12580ab2",
  measurementId: "G-WDSWVJSS8Y"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); 

// Ensure Analytics only initializes if supported
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export { db, auth, storage   };  