import { Router } from "express";
import { signIn, signOut, userSignIn } from "../controllers/auth.controller.js";
import { createAdmin } from "../controllers/auth.controller.js";

const authRouter = Router();

// admin sign in
authRouter.post("/sign-in", signIn);
authRouter.post("/user-sign-in", userSignIn);
authRouter.post("/create-admin", createAdmin);

authRouter.post("/sign-up", (req, res) => {
  res.send("Signup");
  console.log("Sign up");
});

authRouter.post("/sign-out", signOut);

export default authRouter;
