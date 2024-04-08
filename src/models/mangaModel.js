import { mongoose, Schema } from "mongoose";

const criticSchema = new Schema({
  title: String,
  comment: String,
});

const mangaSchema = new Schema({
  title: String,
  critic: [criticSchema],
  category: String,
  image: String,
  imagesection: String,
  imagebackground: String,
});

const Manga = mongoose.model("Manga", mangaSchema);

export default Manga;
