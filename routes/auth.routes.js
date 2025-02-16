import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-in", (req, res) => {
  res.send("Sign in");
  console.log("Sign in");
});

export default authRouter;
