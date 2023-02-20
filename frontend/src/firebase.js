// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfCR2AVpoFeJdJ4w26M0nHvVJJWBg0Z-g",
    authDomain: "twitter-150c8.firebaseapp.com",
    projectId: "twitter-150c8",
    storageBucket: "twitter-150c8.appspot.com",
    messagingSenderId: "898305104958",
    appId: "1:898305104958:web:25374d61cfab011492c56f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider

export default app