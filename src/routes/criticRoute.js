import { Router } from "express";
import {
  getAllCritics,
  createCriticsForManga,
  updateCritic,
  deleteCritic,
  showMeOneCritics,
  createCriticInManga,
} from "../controllers/criticController";
const criticRouter = Router();

criticRouter.get("/all", getAllCritics);

criticRouter.post("/add", createCriticsForManga);

criticRouter.put("/edit/:id", updateCritic);

criticRouter.delete("/delete/:id", deleteCritic);

criticRouter.get("/:id", showMeOneCritics);

criticRouter.post("/:mangaId/critic", createCriticInManga);

export default criticRouter;
