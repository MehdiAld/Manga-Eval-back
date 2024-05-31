import { mongoose, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: {
    type: String,
    min: [8, "Le mot passe doit contenir au moins 8 caractères ou plus"],
  },
  created_at: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
  critics: [{ type: Schema.Types.ObjectId, ref: "Critics" }],
});

userSchema.methods.crypto = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

userSchema.methods.veriPass = async (password, elderPassword) => {
  const result = await bcrypt.compare(password, elderPassword);
  return result;
};

const User = mongoose.model("User", userSchema);

export default User;
