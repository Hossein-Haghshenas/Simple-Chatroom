// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  Timestamp,
} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.6.8/firebase-firestore-lite.min.js";

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2Is-FTOQXWYp074k-nkdOnOE46w99dGQ",
  authDomain: "first-project-bd1ec.firebaseapp.com",
  projectId: "first-project-bd1ec",
  storageBucket: "first-project-bd1ec.appspot.com",
  messagingSenderId: "161762904855",
  appId: "1:161762904855:web:b33d1229b8fe40b0ca8552",
  measurementId: "G-DWMWWZEFM0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* export libraries & information to other js files */
export { db, collection, doc, getDocs, setDoc, deleteDoc, Timestamp };
