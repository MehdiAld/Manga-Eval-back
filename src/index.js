import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";
import criticRouter from "./routes/criticRoute";
import mangaRouter from "./routes/mangaRoute";

dotenv.config();
const app = express();
const port = process.env.PORT;

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`[📙DATABASE] MongoDB est connecté !!`);
}

main().catch((err) => console.log(err));

// Middleware pour autoriser les requêtes CORS depuis http://localhost:5173
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => console.log("Welcome To MangaEval"));

app.use("/mangas", mangaRouter);
app.use("/critics", criticRouter);
app.use("/auth", userRouter);

app.listen(port, () =>
  console.log(`[SERVER] is running on https://localhost:${port}`)
);
