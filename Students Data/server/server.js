import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import students from "./routes/index.js";
import users from "./routes/userAuth.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/students", students);
app.use('/', users)


const connectMongoDB = async () => {
  const url = process.env.MONGO_URL || 'mongodb+srv://pareshay99099:LPd5lf4cgVPdgaNC@apicreate.on37h.mongodb.net/'
  try {
    await mongoose.connect(url);
    console.log("Successfully connected to the MongoDB database");
  } catch (err) {
    console.error("Could not connect to the database. Exiting now:", err);
    process.exit(1);
  }
};

const startServer = async () => {
  const PORT = process.env.PORT || 5000;
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();

