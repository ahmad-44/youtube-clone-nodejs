import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `\nMongoDB Connection !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB Connection Failed::", error);
    process.exit(1); //instead of {throw error}
  }
};

export default connectDB;
