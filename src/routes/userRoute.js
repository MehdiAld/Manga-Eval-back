import { Router } from "express";
import {
  GetAllUsers,
  deleteUser,
  login,
  register,
  updateUser,
  GetUserById,
  UpdatePhotoProfil,
  UpdateBanner,
} from "../controllers/userController";
const userRouter = Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/all", GetAllUsers);

userRouter.get("/user/:userId", GetUserById);

userRouter.delete("/delete/:userId", deleteUser);

userRouter.put("/edit/:userId", updateUser);

userRouter.put("/:userId/updateProfile", UpdatePhotoProfil);

userRouter.put("/:userId/updateBanner", UpdateBanner);


export default userRouter;
