import Form from "../models/form.model.js";

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
