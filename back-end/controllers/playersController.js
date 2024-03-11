import { isValidObjectId } from "mongoose";
import PlayersModel from "../models/playersModel.js";
import { v2 as cloudinary } from "cloudinary";
import { encryptPassword } from "../utils/encryptPassword.js";

const getAllPlayers = async (req, res) => {
  try {
    // Fetch all players
    const allPlayers = await PlayersModel.find({});
    console.log("allPlayers :>> ", allPlayers);

    res.status(200).json({
      number: allPlayers.length,
      allPlayers,
    });
  } catch (error) {
    console.log("error :>>", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const createPlayer = async (req, res) => {
  console.log(req.body);
  const {
    name,
    overall,
    position,
    pace,
    shooting,
    passing,
    dribbling,
    defense,
    physicality,
    playerOwner,
    image,
  } = req.body;

  try {
    const existingCard = await PlayersModel.findOne({
      name,
    });
    if (existingCard) {
      return res.status(400).json({ error: "Card already exists" });
    }

    const newPlayer = await PlayersModel.create({
      name,
      overall,
      position,
      pace,
      shooting,
      passing,
      dribbling,
      defense,
      physicality,
      playerOwner,
      image,
    });
    console.log("newPlayer :>> ", newPlayer);
    res.status(201).json(newPlayer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updatePlayers = async (req, res) => {
  const { id } = req.params;
  const valid = isValidObjectId(id);
  console.log(valid);
  if (!valid) return res.status(400).json({ error: "ID MISSING" });
  try {
    const updatedPlayer = await PlayersModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPlayer)
      return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedPlayer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const pictureUpload = async (req, res) => {
  // console.log("req.file :>> ", req.file);

  if (!req.file) {
    res.status(500).json({ message: "File not Supported" });
  }

  if (req.file) {
    try {
      const pictureUploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "playersProfile",
      });
      console.log("pictureUploaded :>> ", pictureUploaded);
      res.status(201).json({
        message: "File Uploaded Succesfully",
        error: false,
        data: {
          image: pictureUploaded.secure_url,
        },
      });
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({
        message: "Something Went Wrong",
        error: true,
        data: null,
      });
    }
  }
};

export { getAllPlayers, updatePlayers, createPlayer, pictureUpload };
