const db = require("../config/db");

exports.createUser = (name, email, password, phone) => {
  return db.query("INSERT INTO users (name,email,password,phone) VALUES (?,?,?,?)", [
    name,
    email,
    password,
    phone,
  ]);
};

exports.findUserByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email=?", [email]);
};

exports.findUserById = (id) => {
  return db.query("SELECT id,name,email,phone,role,created_at FROM users WHERE id=?", [id]);
};

exports.updatePasswordByEmail = (email, password) => {
  return db.query("UPDATE users SET password=? WHERE email=?", [password, email]);
};

exports.updateProfile = (id, name, phone) => {
  return db.query("UPDATE users SET name=?, phone=? WHERE id=?", [name, phone, id]);
};

exports.updatePasswordById = (id, password) => {
  return db.query("UPDATE users SET password=? WHERE id=?", [password, id]);
};

exports.getAllUsers = () => {
  return db.query("SELECT id,name,email,phone,role,created_at FROM users ORDER BY created_at DESC");
};

exports.updateUserByAdmin = (id, name, email, phone, role) => {
  return db.query("UPDATE users SET name=?, email=?, phone=?, role=? WHERE id=?", [
    name,
    email,
    phone,
    role,
    id,
  ]);
};

exports.deleteUser = (id) => {
  return db.query("DELETE FROM users WHERE id=?", [id]);
};
