// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "movie-review-d1e0e.firebaseapp.com",
  projectId: "movie-review-d1e0e",
  storageBucket: "movie-review-d1e0e.appspot.com",
  messagingSenderId: "138402704015",
  appId: "1:138402704015:web:68867efac55418cf479efa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);