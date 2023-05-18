// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth, GoogleAuthProvider, } from "firebase/auth";
import {getFirestore} from "firebase/firestore" ;

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDAXOucMUdyIdgjDjPaDDmbgyeALnbu2zI",
  authDomain: "react-social-media-3c646.firebaseapp.com",
  projectId: "react-social-media-3c646",
  storageBucket: "react-social-media-3c646.appspot.com",
  messagingSenderId: "288072396909",
  appId: "288072396909"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);