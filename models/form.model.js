import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fields: [
    {
      label: { type: String, required: true },
      type: {
        type: String,
        required: true,
        enum: ["text", "number", "date", "file", "textarea"],
      },
      required: { type: Boolean, default: false },
    },
  ],
});

const Form = mongoose.model("Form", formSchema);
export default Form;
