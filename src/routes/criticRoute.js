import { Router } from "express";
import {
  getAllCritics,
  // createCriticsForManga,
  updateCritic,
  deleteCritic,
  showMeOneCritics,
  createCriticInManga,
  createCriticForUser,
  getCriticsByUser,
  getUserCritics,
  getCriticsByManga,
} from "../controllers/criticController";

import { authMiddleware } from "../middlewares/auth";

const criticRouter = Router();

criticRouter.get("/all", getAllCritics);
criticRouter.get("/all/:mangaId", getCriticsByManga);
criticRouter.post("/added", authMiddleware, getUserCritics);
criticRouter.post("/add/:userId", authMiddleware, createCriticForUser);
criticRouter.put("/edit/:id", updateCritic);
criticRouter.delete("/delete/:id", deleteCritic);
criticRouter.get("/:id", showMeOneCritics);

criticRouter.post("/:mangaId/critic", authMiddleware, createCriticInManga);

export default criticRouter;
