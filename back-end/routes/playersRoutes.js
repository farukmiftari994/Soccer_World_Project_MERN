import express from "express";
import {
  createPlayer,
  getAllPlayers,
  updatePlayer,
  pictureUpload,
} from "../controllers/playersController.js";
import multerUpload from "../middlewares/multer.js";

const playersRouter = express.Router();

playersRouter.get("/all", getAllPlayers);

playersRouter.post("/createPlayer", createPlayer);
playersRouter.post("/update/:id", updatePlayer);
playersRouter.post(
  "/pictureUpload",
  multerUpload.single("image"),
  pictureUpload
);

export default playersRouter;
