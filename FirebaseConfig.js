// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc,  getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgSC0dpk1w0fVFhL9PE2gejxDUiLLh8hU",
  authDomain: "teste-fb-66cbb.firebaseapp.com",
  projectId: "teste-fb-66cbb",
  storageBucket: "teste-fb-66cbb.appspot.com",
  messagingSenderId: "1093789252279",
  appId: "1:1093789252279:web:25382b94ac9336fccaab32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app ,db ,getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc};