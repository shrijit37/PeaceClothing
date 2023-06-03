import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database"
import { getStorage } from "firebase/storage";
// import { initializeApp } from "firebase";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/storage";
// import "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDTnmzLx51XWi5_aKYlpU8uDXriLRe-cxU",
  authDomain: "peace-60e53.firebaseapp.com",
  projectId: "peace-60e53",
  storageBucket: "peace-60e53.appspot.com",
  messagingSenderId: "87111994078",
  appId: "1:87111994078:web:b68c9ecd0a6520958dd04f",
  measurementId: "G-VKRQHPHNXE",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth(app);
export const db = firebase.firestore(app);
export const storage = getStorage(app);
// export const storage = firebase.(app);
