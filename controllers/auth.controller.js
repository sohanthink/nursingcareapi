import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await Admin.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const pass = await bcrypt.compare(password, user.password);

  if (!pass) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({ message: "Sign in successful", user });
};

export const createAdmin = async (req, res) => {
  const hashedPassword = await bcrypt.hash("123456", 10); // Hash the password

  const admin = new Admin({
    username: "sohanmollah",
    email: "sohan@gmail.com",
    password: hashedPassword, // Store the hashed password
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
    ), // Example: 1 year from now
    isActive: true,
  });

  await admin.save();
  console.log("Admin created successfully!");
  res.status(200).json({ message: "Admin created successfully!", admin });
};

export const signOut = async (req, res) => {
  res.send("Sign out");
  console.log("Sign out");
};
