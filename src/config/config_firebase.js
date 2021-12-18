// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_vSXm63q6u-O7tW8xyb6eDUP_ay02ygU",
    authDomain: "organicshopapp-4d731.firebaseapp.com",
    projectId: "organicshopapp-4d731",
    storageBucket: "organicshopapp-4d731.appspot.com",
    messagingSenderId: "997525598035",
    appId: "1:997525598035:web:6d67b3242430a4b220fba6",
    measurementId: "G-ELCPB97MTP"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
