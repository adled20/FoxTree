import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js'
    
// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js'
import { getFirestore} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';
const firebaseConfig = {
    apiKey: "AIzaSyD-jmnrET74wOQzOt2bFjP2wkJlU47Vqns",
authDomain: "foxtree-a4f9f.firebaseapp.com",
databaseURL: "https://foxtree-a4f9f-default-rtdb.firebaseio.com",
projectId: "foxtree-a4f9f",
storageBucket: "foxtree-a4f9f.firebasestorage.app",
messagingSenderId: "595334160785",
appId: "1:595334160785:web:7789b4b47e8a1420493a30",
measurementId: "G-VH9S5GMG5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const Autenticacion=getAuth(app);
export const Acceso=getFirestore(app);



