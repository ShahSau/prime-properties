// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'prime-properties-7161a.firebaseapp.com',
  projectId: 'prime-properties-7161a',
  storageBucket: 'prime-properties-7161a.appspot.com',
  messagingSenderId: '586330919733',
  appId: '1:586330919733:web:73723c361a7cf6aeb6327c'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)