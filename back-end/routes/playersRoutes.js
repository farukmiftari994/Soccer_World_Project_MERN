import express from "express";
import {
  createPlayer,
  getAllPlayers,
  updatePlayers,
  pictureUpload,
} from "../controllers/playersController.js";
import multerUpload from "../middlewares/multer.js";

const playersRouter = express.Router();

playersRouter.get("/all", getAllPlayers);

playersRouter.post("/createPlayer", createPlayer);
playersRouter.patch("/updatePlayers/:id", updatePlayers);
playersRouter.post(
  "/pictureUpload",
  multerUpload.single("image"),
  pictureUpload
);

export default playersRouter;
