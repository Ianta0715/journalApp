// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqwdrLdNefjqr05S4P0gXMifxD5Or9byY",
    authDomain: "react-cursos-dc121.firebaseapp.com",
    projectId: "react-cursos-dc121",
    storageBucket: "react-cursos-dc121.appspot.com",
    messagingSenderId: "272824658750",
    appId: "1:272824658750:web:317eaedcf27d478e889a6f"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);