import { Router } from "express";
import {
  GetAllUsers,
  deleteUser,
  login,
  register,
  updateUser,
} from "../controllers/userController";
const userRouter = Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/all", GetAllUsers);

userRouter.delete("/delete/:userId", deleteUser);

userRouter.put("/edit/:userId", updateUser);

export default userRouter;
