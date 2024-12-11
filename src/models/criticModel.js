import { Schema, mongoose } from "mongoose";

const criticsSchema = new Schema({
  title: String,
  comment: String,
  created_at: { type: Date, default: Date.now },
  id_manga: { type: Schema.Types.ObjectId, ref: "Manga" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  username: { type: String,required: true },
});

const Critics = mongoose.model("Critics", criticsSchema);

export default Critics;
