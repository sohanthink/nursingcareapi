import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [50, "Username must be less than 50 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  role: {
    type: String,
    default: "admin",
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  }, // Hashed password
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10,15}$/, "Please enter a valid phone number"],
  },
  companyName: {
    type: String,
    maxlength: [100, "Company name must be less than 100 characters long"],
  },
  address: {
    type: String,
    maxlength: [200, "Address must be less than 200 characters long"],
  },
  profilePhoto: {
    type: String, // URL of uploaded profile image
    match: [
      /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/,
      "Please enter a valid URL for the profile photo",
    ],
  },
  designation: {
    type: String,
    maxlength: [100, "Designation must be less than 100 characters long"],
  },
  education: {
    type: String,
    maxlength: [100, "Education must be less than 100 characters long"],
  },
  aboutYou: {
    type: String,
    maxlength: [500, "About you must be less than 500 characters long"],
  },
  userCount: {
    type: Number,
    max: [100, "User count cannot exceed 100"],
  }, // Limit on how many users can be added
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  licenseExpiry: {
    type: Date,
  }, // For yearly rental tracking
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
