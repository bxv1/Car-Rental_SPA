const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json("All fields are required");
    }

    const [existingRows] = await User.findUserByEmail(email);
    if (existingRows.length > 0) {
      return res.status(409).json("Email already in use");
    }

    const hash = await bcrypt.hash(password, 10);
    await User.createUser(name, email, hash, phone);

    return res.json({ message: "User created" });
  } catch (err) {
    return res.status(500).json("Failed to create account");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Email and password are required");
    }

    const [rows] = await User.findUserByEmail(email);

    if (rows.length === 0) {
      return res.status(404).json("User not found");
    }

    const user = rows[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json("Wrong password");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json("Login failed");
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json("Email and new password are required");
    }

    const [rows] = await User.findUserByEmail(email);
    if (rows.length === 0) {
      return res.status(404).json("No account found with this email");
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await User.updatePasswordByEmail(email, hash);

    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    return res.status(500).json("Could not reset password");
  }
};

exports.getMyProfile = async (req, res) => {
  const [rows] = await User.findUserById(req.user.id);
  if (rows.length === 0) {
    return res.status(404).json("User not found");
  }

  return res.json(rows[0]);
};

exports.updateMyProfile = async (req, res) => {
  const { name, phone, newPassword } = req.body;

  if (!name || !phone) {
    return res.status(400).json("Name and phone are required");
  }

  await User.updateProfile(req.user.id, name, phone);

  if (newPassword) {
    const hash = await bcrypt.hash(newPassword, 10);
    await User.updatePasswordById(req.user.id, hash);
  }

  return res.json("Profile updated");
};
