import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      companyName,
      address,
      profilePhoto,
      designation,
      education,
      aboutYou,
      dateOfBirth,
      gender,
      medicalHistory,
      emergencyContact,
      allergies,
      currentMedications,
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      companyName,
      address,
      profilePhoto,
      designation,
      education,
      aboutYou,
      dateOfBirth,
      gender,
      medicalHistory,
      emergencyContact,
      allergies,
      currentMedications,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User creation failed", error: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find().skip(skip).limit(limit);

    const totalPages = Math.ceil(totalUsers / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      totalUsers,
      totalPages,
      currentPage: page,
      hasNextPage,
      hasPrevPage,
      users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve user", error: error.message });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      companyName,
      address,
      profilePhoto,
      designation,
      education,
      aboutYou,
      dateOfBirth,
      gender,
      medicalHistory,
      emergencyContact,
      allergies,
      currentMedications,
      oldPassword,
      newPassword,
    } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.companyName = companyName || user.companyName;
    user.address = address || user.address;
    user.profilePhoto = profilePhoto || user.profilePhoto;
    user.designation = designation || user.designation;
    user.education = education || user.education;
    user.aboutYou = aboutYou || user.aboutYou;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.gender = gender || user.gender;
    user.medicalHistory = medicalHistory || user.medicalHistory;
    user.emergencyContact = emergencyContact || user.emergencyContact;
    user.allergies = allergies || user.allergies;
    user.currentMedications = currentMedications || user.currentMedications;

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User update failed", error: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User deletion failed", error: error.message });
  }
};
