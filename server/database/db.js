
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_db, {
      dbName: "nexora",
    });

    console.log("MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;


