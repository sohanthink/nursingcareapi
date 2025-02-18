import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/create-user", (req, res) => {
  res.send("Create user");
  console.log("Create user");
});

export default adminRouter;
