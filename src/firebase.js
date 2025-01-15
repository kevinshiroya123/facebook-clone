import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZcVGFCisbWZzoiQIQancRExAeRkmtRg8",
  authDomain: "facebook-clone-ec7f9.firebaseapp.com",
  projectId: "facebook-clone-ec7f9",
  storageBucket: "facebook-clone-ec7f9.firebaseapp.com",
  messagingSenderId: "555224784163",
  appId: "1:555224784163:web:26d79d3512c61d6c538096",
  measurementId: "G-8JQN1FPC5R",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };