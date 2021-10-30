import "firebase/compat/functions";
import app from "./app";

const functions = app.functions();

const initGameUpdate = functions.httpsCallable("manualUpdate");

export { functions, initGameUpdate };
