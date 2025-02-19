import { Router } from "express";
import {
  createForm,
  getForm,
  getForms,
  updateForm,
  asignForm,
} from "../controllers/form.controller.js";
import { adminAuthorize } from "../middlewares/auth.middleware.js";

const formRouter = Router();

formRouter.post("/create-form", adminAuthorize, createForm);
formRouter.get("/get-forms", adminAuthorize, getForms);
formRouter.get("/get-form/:id", adminAuthorize, getForm);
formRouter.put("/update-form/:id", adminAuthorize, updateForm);

formRouter.post("/asign-form", adminAuthorize, asignForm);

export default formRouter;
