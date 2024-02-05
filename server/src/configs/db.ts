import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/21twelveDB";

const connectDB = async () => {
  try {
    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions;
    await mongoose.connect(MONGO_URI, dbOptions);
    console.log(`Connected to Database 🧰`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
