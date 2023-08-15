// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAS0re3wNITVdxUKG-HdUNpqQGVdQ09VsY",
  authDomain: "the-movie-catalogue1.firebaseapp.com",
  projectId: "the-movie-catalogue1",
  storageBucket: "the-movie-catalogue1.appspot.com",
  messagingSenderId: "183630742170",
  appId: "1:183630742170:web:ba044a1b9861949b8c5523",
  measurementId: "G-EXG7XQTQ8X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const analytics = getAnalytics(app);
export const fireStore = getFirestore(app);
