import "firebase/compat/firestore";
import app from "./app";

export const firestore = app.firestore();

const currentGenerationKey = "generation/current";

export const currentGenerationDoc = firestore.doc(currentGenerationKey);
