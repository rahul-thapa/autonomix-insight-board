import mongoose from "mongoose";

const MONGO_URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB connected on port: ", process.env.DB_PORT);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}
