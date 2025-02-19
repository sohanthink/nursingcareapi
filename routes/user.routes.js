import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { adminAuthorize } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/create-user", adminAuthorize, createUser);
userRouter.get("/get-users", adminAuthorize, getUsers);
userRouter.get("/get-user/:id", adminAuthorize, getUserById);
userRouter.put("/update-user/:id", adminAuthorize, updateUser);
userRouter.delete("/delete-user/:id", adminAuthorize, deleteUser);

export default userRouter;
