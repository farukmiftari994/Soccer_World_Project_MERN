import express from "express";
import {
  getUsers,
  getUserByEmail,
  getProfile,
  login,
  signup,
  updateUser,
  deleteUser,
  deletePlayer,
  updateUserList,
  administrator,
} from "../controllers/userController.js";
import jwtAuth from "../middlewares/jwtAuth.js";
import adminCheck from "../middlewares/adminCheck.js";

const userRouter = express.Router();

userRouter.get("/find/:email", getUserByEmail);
userRouter.get("/all", getUsers);
userRouter.get("/profile", jwtAuth, getProfile);

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/update/:id", updateUser);
userRouter.post("/delete/:id", jwtAuth, deleteUser);
userRouter.post("/deletePlayer", jwtAuth, deletePlayer);
userRouter.post("/administrator", jwtAuth, adminCheck, administrator);

userRouter.patch("/updateUserList", updateUserList);

export default userRouter;
