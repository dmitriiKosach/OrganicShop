import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgMIrKr7WS9OgXvMGUPef9rTo-sMRfMv4",
    authDomain: "organicshopapp-89cc4.firebaseapp.com",
    projectId: "organicshopapp-89cc4",
    storageBucket: "organicshopapp-89cc4.appspot.com",
    messagingSenderId: "452178859172",
    appId: "1:452178859172:web:0eaf2358ebd4dec3b7c231"
};
// Initialize Firebase
const appFirebase = firebase.initializeApp(firebaseConfig);

export default appFirebase;
