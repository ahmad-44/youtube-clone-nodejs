// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});
connectDB();

/*
import express from "express";
const app = express();
(async () => {
  try {
    // prettier-ignore
    await mongoose.connect(`${process.env.MONGODB_URI}`/{DB_NAME});

    //app is listening. if it is unable to listen db, raise error
    app.on("error", (error) => {
      console.log("ERROR::", error);
      throw error;
    });

    //if there is no issue, make the app listen on a port
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on Port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("ERROR: ", error);
    throw error;
  }
})();
*/
