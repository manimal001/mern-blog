// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3ac45.firebaseapp.com",
  projectId: "mern-blog-3ac45",
  storageBucket: "mern-blog-3ac45.firebasestorage.app",
  messagingSenderId: "407189136061",
  appId: "1:407189136061:web:6a89ab152d3c2b240b4dd4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);