import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/create-user", createUser);
userRouter.get("/get-users", getUsers);
userRouter.get("/get-user/:id", getUserById);
userRouter.put("/update-user/:id", updateUser);

export default userRouter;
