import firebase from "firebase/compat/app";
import firebaseConfig from "../game-of-life-next-firebase-sdk.json";
import "firebase/compat/firestore";

const app = firebase.apps.length
  ? firebase.apps[0]
  : firebase.initializeApp(firebaseConfig);

const firestore = app.firestore();

const currentGenerationKey = "generation/current";

type GenerationDocument = {
  data: string;
};

const getCurrentGeneration = async () => {
  const doc = await firestore.doc(currentGenerationKey).get();
  const { data } = doc.data() as GenerationDocument;
  return JSON.parse(data) as boolean[][];
};

export { firestore, getCurrentGeneration };
