import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  phone: { type: String, required: true },
  companyName: { type: String },
  address: { type: String },
  profilePhoto: { type: String }, // URL of uploaded profile image
  designation: { type: String },
  education: { type: String },
  aboutYou: { type: String },
  userCount: { type: Number, max: 100 }, // Limit on how many users can be added
  subscribedAt: { type: Date, default: Date.now },
  licenseExpiry: { type: Date }, // For yearly rental tracking
  isActive: { type: Boolean, default: true },
});

// Method to generate JWT token
adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

// Static method to verify JWT token
adminSchema.statics.verifyAuthToken = function (token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
