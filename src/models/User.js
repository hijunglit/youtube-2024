import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  avatarUrl: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  socialOnly: Boolean,
  username: { type: String, required: true, unique: true },
  password: String,
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref:'Video' }],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);
export default User;
