import {getFirestore} from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTPZC1YoC_Gy76wJNUGkorD9tIjMnmca8",
  authDomain: "house-market-app-4e946.firebaseapp.com",
  projectId: "house-market-app-4e946",
  storageBucket: "house-market-app-4e946.appspot.com",
  messagingSenderId: "647233382857",
  appId: "1:647233382857:web:8e3299d126bc8f57c26018"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();