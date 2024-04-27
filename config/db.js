import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database is connected...");
  } catch (error) {
    `Error:${error.message}`;
    process.exit(1);
  }
};

export default connectDB;
