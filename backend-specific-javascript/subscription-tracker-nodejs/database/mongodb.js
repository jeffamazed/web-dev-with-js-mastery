import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the DB_URI environment variable inside .env.<development/production>.local"
  );
}

let connection = null;

const connectDB = async () => {
  connection = await mongoose.connect(DB_URI);

  console.log(`Connected to MongoDB in ${NODE_ENV} mode!`);
  return connection;
};

// attach getter
connectDB.connection = () => connection;

export default connectDB;
