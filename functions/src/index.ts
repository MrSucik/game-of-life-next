import * as functions from "firebase-functions";
import { doc } from "./fire";
import Grid from "./game/grid";

type GenerationDocument = {
  data: string;
};

type GenerationParsed = boolean[][];

const updateGame = async () => {
  const docData = await doc.get();
  const { data } = docData.data() as GenerationDocument;
  const parsed = JSON.parse(data) as GenerationParsed;
  const grid = new Grid(parsed);

  grid.nextIteration();

  const nextData = grid.exportAsDefinition();
  doc.update({ data: JSON.stringify(nextData) });
};

export const scheduledUpdate = functions.pubsub
  .schedule("every 1 second")
  .onRun(async () => {
    await updateGame();
  });

export const manualUpdate = functions.https.onRequest(async () => {
  await updateGame();
});
