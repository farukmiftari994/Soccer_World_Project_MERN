import { isValidObjectId } from "mongoose";
import { UserModel } from "../models/userModel.js";
import PlayersModel from "../models/playersModel.js";

const getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({}).select("-password");
    // .populate({
    //   path: "players",
    // });
    res.status(200).json(allUsers);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "server error" });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const foundUser = await UserModel.findOne({ email: req.params.email });
    if (foundUser) {
      return res.status(200).json(foundUser);
    } else {
      res.status(404).json({ error: "No user found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "e" });
  }
};

const signup = async (req, res) => {
  console.log(req.body);
  const { email, password, username, favPlayer } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All fields must be included" });
  try {
    const newUser = await UserModel.create({
      email,
      password,
      username,
      favPlayer,
    });
    console.log("newUser :>> ", newUser);
    if (newUser) res.status(201).json(newUser);
    else res.status(400).json({ error: "User couldnt be created" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      res.status(400).json({ error: "Email already registered" });
    // res.status(500).json({ error: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All fields must be included" });
  try {
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser)
      return req.status(500).json({ error: "Something went wrong" });
    if (foundUser.password === password) {
      const user = {
        _id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username,
        createAt: foundUser.createdAt,
      };
      return res.status(200).json(user);
    } else res.status(400).json({ error: "Password incorrect" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "No user exist with that email" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const valid = isValidObjectId(id);
  console.log(valid);
  if (!valid) return res.status(400).json({ error: "ID MISSING" });
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserList = async (req, res) => {
  console.log("req.body :>> ", req.body);
  const {
    userId,
    playerId,
    name,
    overall,
    position,
    pace,
    shooting,
    passing,
    dribbling,
    defense,
    physicality,
  } = req.body;
  //! when we make this route authorize (sending the token in the request), we wont need to receive the ID in the request,
  //! because we will receive the user information thanks to the Token and Passport

  // UserModel.findByIdAndDelete(playerId);
  try {
    const updateUserWithPlayer = await UserModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          favPlayer: {
            _id: playerId,
            name: name,
            overall: overall,
            position: position,
            pace: pace,
            shooting: shooting,
            passing: passing,
            dribbling: dribbling,
            defense: defense,
            physicality: physicality,
          },
        },
      },

      { new: true }
    ).populate({ path: "favPlayer" });

    const updatePlayerWithUser = await PlayersModel.findByIdAndUpdate(
      playerId,
      { playerOwner: userId },
      { new: true }
    ).populate({ path: "playerOwner" });

    res.status(201).json({
      updateUserWithPlayer,
      updatePlayerWithUser,
    });
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export { getUsers, getUserByEmail, signup, login, updateUser, updateUserList };
