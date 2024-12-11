import { Router } from "express";
import {
  getAllCritics,
  updateCritic,
  deleteCritic,
  showMeOneCritics,
  createCriticInManga,
  createCriticForUser,
  getCriticsByUser,
  getUserCritics,
  getCriticsByManga,
  likeCritic,
  unlikeCritic,
  getLikedCritics,
  
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

criticRouter.post("/:userId/like", likeCritic); 
criticRouter.delete("/:userId/unlike/:criticId", unlikeCritic); 
criticRouter.get("/:userId/liked", getLikedCritics); 

criticRouter.post("/:mangaId/critic", authMiddleware, createCriticInManga);

export default criticRouter; 
