import * as functions from "firebase-functions";
import { doc, engineDoc } from "./fire";
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

export const scheduledUpdate = functions
  .runWith({ timeoutSeconds: 540, memory: "4GB" })
  .pubsub.schedule("every 9 mins")
  .onRun(
    () =>
      new Promise((resolve) => {
        let count = 0;
        const interval = setInterval(async () => {
          if (count >= 120 * 9) {
            clearInterval(interval);
            resolve(null);
            return;
          }
          const snapshot = await engineDoc.get();
          if (snapshot.data()?.running) {
            functions.logger.log("Game updated");
            await updateGame();
            count++;
          } else {
            functions.logger.log("Game paused");
          }
        }, 500);
      })
  );

export const manualUpdate = functions.https.onRequest(
  async (_request, response) => {
    response.send();
  }
);
