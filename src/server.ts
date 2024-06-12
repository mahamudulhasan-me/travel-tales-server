import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

let server: Server;
async function main() {
  try {
    // connect with mongodb
    await mongoose.connect(config.mongodb_url as string);

    server = app.listen(config.port, () => {
      console.log(`Express server listening on ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log("UNHANDLED REJECTION IS DETECTED!!! SHUTING DOWN!");

  if (server) {
    server.close(() => process.exit());
  }
});

process.on("uncaughtException", () => {
  console.log("UNCAUGHT EXCEPTION IS DETECTED!!!");
  process.exit();
});
