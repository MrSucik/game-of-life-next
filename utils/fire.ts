import firebase from "firebase/compat/app";
import firebaseConfig from "../game-of-life-next-firebase-sdk.json";
import "firebase/compat/firestore";

const app = firebase.apps.length
  ? firebase.apps[0]
  : firebase.initializeApp(firebaseConfig);

const firestore = app.firestore();

export { firestore };
