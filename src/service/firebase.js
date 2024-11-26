import "firebase/compat/auth";
import "firebase/compat/firestore";

import firebase from "firebase/compat/app";

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa Firestore
const db = firebase.firestore();

// Exportar las instancias de Firebase y Firestore
export { db, firebase };
