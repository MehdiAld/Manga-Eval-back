import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";
import criticRouter from "./routes/criticRoute";
import mangaRouter from "./routes/mangaRoute";

const app = express();
const port = process.env.PORT;

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`[📙DATABASE] MongoDB est connecté !!`);
} 
  

main().catch((err) => console.log(err));

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => console.log("Welcome To MangaEval"));

app.use("/mangas", mangaRouter);
app.use("/critics", criticRouter);
app.use("/auth", userRouter);

app.listen(port, () =>
  console.log(`[SERVER] is running on https://localhost:${port}`)
);
