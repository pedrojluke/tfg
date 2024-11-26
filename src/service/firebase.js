import "firebase/compat/auth";
import "firebase/compat/firestore";

import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBKs-IzC5R9saQhQoAQwWHWM_BOafFx8vA",
  authDomain: "retranqueapp-5e455.firebaseapp.com",
  projectId: "retranqueapp-5e455",
  storageBucket: "retranqueapp-5e455.appspot.com", // Nota: Revisé este valor.
  messagingSenderId: "158068828517",
  appId: "1:158068828517:web:3ea62d1fd88cedf4ded98c",
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa Firestore
const db = firebase.firestore();

// Exportar las instancias de Firebase y Firestore
export { db, firebase };
