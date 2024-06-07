import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA11SkdRsbA4erNd2JbAd7JJJmJuJQKS14",
  authDomain: "secret-blogpost.firebaseapp.com",
  projectId: "secret-blogpost",
  storageBucket: "secret-blogpost.appspot.com",
  messagingSenderId: "324649163589",
  appId: "1:324649163589:web:8c53542fe11e4b45df3c2c",
  measurementId: "G-S7EPYYN5XT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};
export const db = getFirestore(app);
