import { initializeApp } from "firebase-admin";

const app = initializeApp();

const firestoreApp = app.firestore();

const doc = firestoreApp.doc("generation/current");

export { doc, firestoreApp };
