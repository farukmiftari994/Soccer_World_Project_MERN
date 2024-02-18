import express from "express";
import {
  getUsers,
  getUserByEmail,
  login,
  signup,
  updateUser,
  updateUserList,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/find/:email", getUserByEmail);
userRouter.get("/all", getUsers);

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/update/:id", updateUser);
userRouter.patch("/updateUserList", updateUserList);

export default userRouter;
