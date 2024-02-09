import express from "express";
import {
  getUsers,
  getUserByEmail,
  login,
  signup,
  updateUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/find/:email", getUserByEmail);
userRouter.get("/all", getUsers);

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/update", updateUser);

export default userRouter;
