import { mongoose, Schema } from "mongoose";

const mangaSchema = new Schema({
  title: String,
  critics: [{ type: Schema.Types.ObjectId, ref: "Critics" }],
  category: String,
  image: String,
  imagesection: String,
  imagebackground: String,
  created_at: { type: Date, default: Date.now },
});

const Manga = mongoose.model("Manga", mangaSchema);

export default Manga;
