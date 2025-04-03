// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhf5xIPqm5dYRGawdkjwI5kzarWxTYhJo",
  authDomain: "visit-bot-a5504.firebaseapp.com",
  projectId: "visit-bot-a5504",
  storageBucket: "visit-bot-a5504.firebasestorage.app",
  messagingSenderId: "1004516110479",
  appId: "1:1004516110479:web:cae59994a2f8e47b4180fa",
  measurementId: "G-YS8946D3Y2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export{db};