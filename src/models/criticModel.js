import { Schema, mongoose } from "mongoose";

const criticsSchema = new Schema({
  title: String,
  comment: String,
});

const Critics = mongoose.model("Critics", criticsSchema);

export default Critics;
