import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: String,
    player: { type: mongoose.Schema.Types.ObjectId, ref: "players" },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", userSchema);
