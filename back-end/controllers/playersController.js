import { isValidObjectId } from "mongoose";
import PlayersModel from "../models/playersModel.js";

// const getAllPlayers = async (req, res) => {
//   try {
//     const allPlayers = await PlayersModel.find();
//     res.status(200).json({
//       number: allPlayers.length,
//       allPlayers,
//     });
//   } catch (error) {
//     console.log("error :>>", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

const getAllPlayers = async (req, res) => {
  try {
    // Fetch all players
    const allPlayers = await PlayersModel.find({});
    console.log("allPlayers :>> ", allPlayers);

    // Remove _id for players who are owned by another user
    const modifiedPlayers = allPlayers.map((player) => {
      if (player.playerOwner !== req.userId) {
        // If the player is owned by another user, remove the _id field
        const { _id, ...rest } = player.toObject(); // Convert Mongoose document to plain JavaScript object
        return rest;
      }
      return player.toObject(); // No modification needed, return the player as is
    });

    res.status(200).json({
      number: modifiedPlayers.length,
      allPlayers: modifiedPlayers,
    });
  } catch (error) {
    console.log("error :>>", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const createPlayer = async (req, res) => {
  console.log(req.body);
  const { name, value, playerOwner } = req.body;

  try {
    const existingCard = await PlayersModel.findOne({
      name,
    });
    if (existingCard) {
      return res.status(400).json({ error: "Card already exists" });
    }
    const newPlayer = await PlayersModel.create({ name, value, playerOwner });
    console.log("newPlayer :>> ", newPlayer);
    res.status(201).json(newPlayer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const valid = isValidObjectId(id);
  console.log(valid);
  if (!valid) return res.status(400).json({ error: "ID MISSING" });
  try {
    const updatedPlayer = await PlayersModel.findBSyIdAndUpdate(id, req.body, {
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

export { getAllPlayers, updatePlayer, createPlayer };
