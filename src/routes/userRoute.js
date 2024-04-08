import { Router } from "express";
import { GetAllUsers, login, register } from "../controllers/userController";
const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/all", GetAllUsers);

export default userRouter;
