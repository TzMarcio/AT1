import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDxA913cTi4Ld78PFqTSnDXnsOUqXE1kI4",
    authDomain: "at1-projeto.firebaseapp.com",
    projectId: "at1-projeto",
    storageBucket: "at1-projeto.appspot.com",
    messagingSenderId: "523305955058",
    appId: "1:523305955058:web:b3d27f78f08eee35cd2a6b",
    measurementId: "G-Q6EYPL1L1N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
