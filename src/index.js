// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// for proper working of .env, also modify scripts > dev for it
dotenv.config({
  path: "./.env",
});

// first connect db
connectDB()
  .then(() => {
    //if db is connected then

    // add event listener to catch any error which can come while listening the app
    app.on("error", (error) => {
      console.log("ERROR::", error);
      throw error;
    });

    // listen app
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port :: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB Connection Failed::", err);
  });

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
