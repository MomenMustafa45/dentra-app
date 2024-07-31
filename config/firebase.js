// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEiPvbKINw80lagjwnIIKcwzZ2R9QxWMk",
  authDomain: "dentra-4d943.firebaseapp.com",
  projectId: "dentra-4d943",
  storageBucket: "dentra-4d943.appspot.com",
  messagingSenderId: "725746204747",
  appId: "1:725746204747:web:537de29d8ccd0919d70dce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// Initialize Firebase Auth with AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export default db;
