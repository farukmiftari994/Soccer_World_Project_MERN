import mongoose from "mongoose";

const playersSchema = new mongoose.Schema({
  name: String,
  overall: String,
  position: String,
  pace: String,
  shooting: String,
  passing: String,
  dribbling: String,
  defense: String,
  physicality: String,
  playerOwner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  image: String,
});

const PlayersModel = mongoose.model("players", playersSchema);

export default PlayersModel;
