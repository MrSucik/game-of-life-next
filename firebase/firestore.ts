import app from "./app";

const firestore = app.firestore();

const currentGenerationKey = "generation/current";

type GenerationDocument = {
  data: string;
};

type GenerationParsed = boolean[][];

const getCurrentGeneration = async () => {
  const doc = await firestore.doc(currentGenerationKey).get();
  const { data } = doc.data() as GenerationDocument;
  return JSON.parse(data) as GenerationParsed;
};

export { firestore, getCurrentGeneration };
