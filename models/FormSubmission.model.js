import mongoose from "mongoose";

const formSubmissionSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: [true, "Form is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  data: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: [true, "Data is required"],
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const FormSubmission = mongoose.model("FormSubmission", formSubmissionSchema);
export default FormSubmission;
