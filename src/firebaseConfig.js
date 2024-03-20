import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAjIT4vhUuhih4S13MyP2iBcxlaGtS1zg0",
  authDomain: "document-web.firebaseapp.com",
  projectId: "document-web",
  storageBucket: "document-web.appspot.com",
  messagingSenderId: "8890519791",
  appId: "1:8890519791:web:ac024b3b28375d19508b1a",
  measurementId: "G-K7PH6THLG9"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore(app)