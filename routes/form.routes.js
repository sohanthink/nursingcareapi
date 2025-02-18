import { Router } from "express";
import { createForm, getForms } from "../controllers/form.controller.js";

const formRouter = Router();

formRouter.post("/create-form", createForm);
formRouter.get("/get-forms", getForms);

export default formRouter;
