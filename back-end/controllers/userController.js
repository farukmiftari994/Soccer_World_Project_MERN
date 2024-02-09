import { UserModel } from "../models/userModel.js";

const getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
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
  const { email, password, username } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "All fields must be included" });
  try {
    const newUser = await UserModel.create({ email, password, username });
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

const updateUser = (req, res) => {
  res.send("update user controller working");
};

export { getUsers, getUserByEmail, signup, login, updateUser };
