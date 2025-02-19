import { Router } from "express";
import { signIn } from "../controllers/auth.controller.js";
import { createAdmin } from "../controllers/auth.controller.js";

const authRouter = Router();

// admin sign in
authRouter.post("/sign-in", signIn);
authRouter.post("/create-admin", createAdmin);

authRouter.post("/sign-up", (req, res) => {
  res.send("Signup");
  console.log("Sign up");
});

export default authRouter;
