import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAh0mx2bzVWcrGEM6cMl7UeOCXPoHMcA-4",
  authDomain: "data-center-service-86092.firebaseapp.com",
  projectId: "data-center-service-86092",
  storageBucket: "data-center-service-86092.appspot.com",
  messagingSenderId: "1007036295901",
  appId: "1:1007036295901:web:216a84c4cadbbc33dec934",
  measurementId: "G-WLPSBWNCHX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
