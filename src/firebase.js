import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5BqqXV1tourAh4ux0eQwdpDOawrel6PM",
  authDomain: "crypto-2c09e.firebaseapp.com",
  projectId: "crypto-2c09e",
  storageBucket: "crypto-2c09e.appspot.com",
  messagingSenderId: "163614709480",
  appId: "1:163614709480:web:c3c45e3ab57d0a7403db5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db,auth};