import Form from "../models/form.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

// Create a new form
export const createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;
    const form = new Form({ title, fields });
    await form.save();
    res.status(201).json({ message: "Form created successfully", form });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Form creation failed", error: error.message });
  }
};

// Get all forms
export const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    const totalForms = forms.length;
    res.status(200).json({ totalForms, forms });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get forms", error: error.message });
  }
};

// Get a single form
export const getForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ form });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get form", error: error.message });
  }
};

// Update a form
export const updateForm = async (req, res) => {
  try {
    // Form.findByIdAndUpdate(id, update, options)
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({ message: "Form updated successfully", form });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update form", error: error.message });
  }
};

// asign a form to user
export const asignForm = async (req, res) => {
  try {
    const { userId, formId } = req.body;

    if (!Array.isArray(formId)) {
      return res
        .status(400)
        .json({ message: "Invalid data format. formIds must be an array" });
    }

    // formId = formId.flat();

    if (!formId.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid formId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Avoid duplicate form assignments
    user.assignedForms = [
      ...new Set([...user.assignedForms.map((id) => id.toString()), ...formId]),
    ];

    await user.save();
    res.status(200).json({ message: "Form assigned successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to asign form", error: error.message });
  }
};
