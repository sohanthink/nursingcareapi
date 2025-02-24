import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = (user) => {
  return jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
};

export const signIn = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email }).session(session);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      session.endSession();
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Sign in successful", user, token });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Sign in failed", error: error.message });
  }
};

export const userSignIn = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).session(session);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      session.endSession();
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Sign in successful", user, token });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Sign in failed", error: error.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new Admin({
      username: "sohanmollah",
      email: "sohan@gmail.com",
      password: hashedPassword,
      phone: "01645113536",
      companyName: "Tech Solutions",
      address: "123 Business Street, New York, NY",
      profilePhoto: "https://example.com/profile1.jpg",
      designation: "CEO",
      education: "MBA in Business Administration",
      aboutYou: "Passionate about innovation and leadership.",
      userCount: 95,
      subscribedAt: new Date(),
      licenseExpiry: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ),
      isActive: true,
    });

    await admin.save();
    res.status(200).json({ message: "Admin created successfully!", admin });
  } catch (error) {
    res.status(500).json({ message: "Admin creation failed" });
  }
};

export const signOut = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Perform sign out operations here
    await session.commitTransaction();
    session.endSession();

    let token = req.headers.authorization?.split(" ")[1];

    if (
      !token ||
      token === "null" ||
      token === "undefined" ||
      token === "Bearer"
    ) {
      return res.status(401).json({ message: "User not authorized" });
    }

    res.setHeader("Authorization", "");

    res.status(200).json({ message: "Sign out successful" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Sign out failed", error: error.message });
  }
};
