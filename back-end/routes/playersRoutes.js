import express from "express";
import { getAllPlayers } from "../controllers/playersController.js";

const playersRouter = express.Router();

playersRouter.get("/all", getAllPlayers);

export default playersRouter;
