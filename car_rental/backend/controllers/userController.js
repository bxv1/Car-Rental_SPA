const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const [rows] = await User.getAllUsers();
  res.json(rows);
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, role, newPassword } = req.body;

  if (!name || !email || !phone || !role) {
    return res.status(400).json("Name, email, phone and role are required");
  }

  await User.updateUserByAdmin(id, name, email, phone, role);

  if (newPassword) {
    const hash = await bcrypt.hash(newPassword, 10);
    await User.updatePasswordById(id, hash);
  }

  res.json("User updated");
};

exports.deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  if (id === req.user.id) {
    return res.status(400).json("You cannot delete your own admin account");
  }

  await User.deleteUser(id);
  res.json("User deleted");
};
