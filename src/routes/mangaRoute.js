import { Router } from "express";
import {
  getAllManga,
  createManga,
  addCriticToManga,
  updateManga,
  deleteManga,
  removeCriticFromManga,
  showMeOneManga,
} from "../controllers/mangaController";
const mangaRouter = Router();

mangaRouter.get("/all", getAllManga);

mangaRouter.post("/add", createManga);

mangaRouter.post("/:mangaId/add/:criticId", addCriticToManga); 

mangaRouter.put("/edit/:id", updateManga);

mangaRouter.delete("/delete/:mangaId", deleteManga);

mangaRouter.delete("/:mangaId/delete/:criticId", removeCriticFromManga);

mangaRouter.get("/:id", showMeOneManga);

export default mangaRouter;
