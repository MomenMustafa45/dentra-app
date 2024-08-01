// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATcRDgAoCYPZulL4rBGQGABGfYwrSEkro",
  authDomain: "dentra-58baa.firebaseapp.com",
  projectId: "dentra-58baa",
  storageBucket: "dentra-58baa.appspot.com",
  messagingSenderId: "17943264593",
  appId: "1:17943264593:web:6b42a84bdb7947998c6770",
  measurementId: "G-1V7D3D104K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// Initialize Firebase Auth with AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export default db;
