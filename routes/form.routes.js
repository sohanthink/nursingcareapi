import { Router } from "express";
import {
  createForm,
  getForm,
  getForms,
  updateForm,
  asignForm,
} from "../controllers/form.controller.js";
import {
  adminAuthorize,
  userAuthorize,
} from "../middlewares/auth.middleware.js";
import { submitForm } from "../controllers/formSubmission.controller.js";

const formRouter = Router();

formRouter.post("/create-form", adminAuthorize, createForm);
formRouter.get("/get-forms", adminAuthorize, getForms);
formRouter.get("/get-form/:id", adminAuthorize, getForm);
formRouter.put("/update-form/:id", adminAuthorize, updateForm);

formRouter.post("/asign-form", adminAuthorize, asignForm);

// form submit || user will submit a form what is created by admin
formRouter.post("/submit-form", userAuthorize, submitForm);

export default formRouter;
