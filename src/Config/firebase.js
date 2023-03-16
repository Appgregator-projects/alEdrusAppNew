import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCDUNO5gmswAHom8UvKralgnINRDqhl5bc",
  authDomain: "aledrusapp.firebaseapp.com",
  projectId: "aledrusapp",
  storageBucket: "aledrusapp.appspot.com",
  messagingSenderId: "1078247872014",
  appId: "1:1078247872014:web:09d53417537ef2e9810e5f",
  measurementId: "G-MWCF78PE0X"
};

const app = initializeApp(firebaseConfig);
const authFirebase = getAuth(app);
const db = getFirestore(app);
//  const database = getDatabase(app);

export { authFirebase, app, db };
