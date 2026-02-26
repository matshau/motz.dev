import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa6VUA7KNPx_f4NK4ARCxLg17XF-Oz7gs",
  authDomain: "motz-dev.firebaseapp.com",
  projectId: "motz-dev",
  storageBucket: "motz-dev.firebasestorage.app",
  messagingSenderId: "72923236339",
  appId: "1:72923236339:web:4eaf4a0b7373276d9e7486",
  measurementId: "G-JRNNKMRXRV",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
