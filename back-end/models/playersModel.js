import mongoose from "mongoose";

const playersSchema = new mongoose.Schema({
  name: { type: String, required: false },
  value: { type: String, required: false },
  playerOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const PlayersModel = mongoose.model("players", playersSchema);

export default PlayersModel;
