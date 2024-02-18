import mongoose from "mongoose";

const playersSchema = new mongoose.Schema({
  name: String,
  value: String,
  playerOwner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const PlayersModel = mongoose.model("players", playersSchema);

export default PlayersModel;
