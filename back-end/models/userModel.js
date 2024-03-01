import mongoose from "mongoose";

// const playerSchema = new mongoose.Schema({
//   _id: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
//   name: String,
//   value: String,
// });

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: String,
    favPlayer: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
        name: { type: mongoose.Schema.Types.String, ref: "players" },
        overall: { type: mongoose.Schema.Types.String, ref: "players" },
        position: { type: mongoose.Schema.Types.String, ref: "players" },
        pace: { type: mongoose.Schema.Types.String, ref: "players" },
        shooting: { type: mongoose.Schema.Types.String, ref: "players" },
        passing: { type: mongoose.Schema.Types.String, ref: "players" },
        dribbling: { type: mongoose.Schema.Types.String, ref: "players" },
        defense: { type: mongoose.Schema.Types.String, ref: "players" },
        physicality: { type: mongoose.Schema.Types.String, ref: "players" },
        image: { type: mongoose.Schema.Types.String, ref: "players" },
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);
