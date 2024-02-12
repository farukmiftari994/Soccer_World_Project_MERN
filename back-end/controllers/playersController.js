import PlayersModel from "../models/playersModel.js";

const getAllPlayers = async (req, res) => {
  try {
    const allPlayers = await PlayersModel.find().populate({
      path: "playerOwner",
      select: "username",
    });
    res.status(200).json({
      number: allPlayers.length,
      allPlayers,
    });
  } catch (error) {
    console.log("error :>>", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export { getAllPlayers };
