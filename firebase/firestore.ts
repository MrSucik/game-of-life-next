import "firebase/compat/firestore";
import app from "./app";

const firestore = app.firestore();

export const currentGenerationKey = "generation/current";
export const currentGenerationDoc = firestore.doc(currentGenerationKey);
type GenerationDocument = {
  data: string;
};

type GenerationParsed = boolean[][];

const getCurrentGeneration = async () => {
  const doc = await currentGenerationDoc.get();
  const { data } = doc.data() as GenerationDocument;
  return JSON.parse(data) as GenerationParsed;
};

export { firestore, getCurrentGeneration };
