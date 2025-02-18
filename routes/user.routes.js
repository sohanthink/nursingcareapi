import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/create-user", createUser);
userRouter.get("/get-users", getUsers);
userRouter.get("/get-user/:id", getUserById);
userRouter.put("/update-user/:id", updateUser);
userRouter.delete("/delete-user/:id", deleteUser);

export default userRouter;
