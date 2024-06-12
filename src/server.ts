import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    // connect with mongodb
    await mongoose.connect(config.mongodb_url as string);

    app.listen(config.port, () => {
      console.log(`Express server listening on ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
