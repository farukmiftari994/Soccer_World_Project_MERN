import colors from "colors";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import "dotenv/config";
import mongoose from "mongoose";
import playersRouter from "./routes/playersRoutes.js";
import cloudinaryConfig from "./config/cloudinary.js";
import passport from "passport";
import jwtStrategy from "./config/passportConfig.js";

const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig();
  app.use(passport.initialize());
  passport.use(jwtStrategy);
};

const addRoutes = () => {
  app.use("/api/users", userRouter);
  app.use("/api/players", playersRouter);
  app.use("*", (req, res) =>
    res.status(404).json({ error: "Endpoint not found." })
  );
};

const startServer = () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running in port :${port}`.bgRed);
  });
};

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to MongoDB established".bgWhite);
  } catch (error) {
    console.log("error connecting to the MongoDB", error);
  }
};

const startBackend = async () => {
  await DBConnection();
  addMiddlewares();
  addRoutes();
  startServer();
};
startBackend();
