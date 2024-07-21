import mongoose from "mongoose";
import config from "./src/config/index.js";
import app from "./src/app.js";
(async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(config.MONGODB_URL);
    console.log("Connected to Database...");
    app.on("error", (err) => {
      console.log("Error: ", err);
      throw err;
    });
    const onListening = () => {
      console.log(`Listening on port number :${config.PORT}`);
    };
    app.listen(config.PORT, onListening);
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
})();
