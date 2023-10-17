"use server";

import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set("strict", true);

  if (!process.env.MONGO_URI) {
    throw new Error("Mongo URI not found");
  }

  if (isConnected) {
    return console.log("DB already connection established");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    console.log("DB connection established");
  } catch (error) {
    console.log(error);
  }
};
