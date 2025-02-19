import FormSubmission from "../models/FormSubmission.model.js";
import upload from "../utils/multer.js";

export const submitForm = [
  upload.fields([{ name: "files", maxCount: 10 }]),
  (err, req, res, next) => {
    if (err) {
      console.error("Multer Error:", err);
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }
    next();
  },
  async (req, res) => {
    try {
      console.log("Request Files:", req.files);
      console.log("Request Body:", req.body);

      const { formId, data } = req.body;
      const files = req.files?.files || [];

      // Parse data if it's a string
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      // Add file paths to data
      files.forEach((file) => {
        parsedData[file.fieldname] = file.path;
      });

      // Ensure req.user._id is available
      if (!req.user?._id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const formSubmission = new FormSubmission({
        form: formId,
        user: req.user._id,
        data: parsedData,
      });
      await formSubmission.save();

      res.status(201).json({
        message: "Form submitted successfully",
        formSubmission,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({
        message: "Form submission failed",
        error: error.message,
      });
    }
  },
];
