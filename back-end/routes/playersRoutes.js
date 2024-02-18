import express from "express";
import {
  createPlayer,
  getAllPlayers,
  updatePlayer,
} from "../controllers/playersController.js";

const playersRouter = express.Router();

playersRouter.get("/all", getAllPlayers);

playersRouter.post("/createPlayer", createPlayer);
playersRouter.post("/update/:id", updatePlayer);

export default playersRouter;
