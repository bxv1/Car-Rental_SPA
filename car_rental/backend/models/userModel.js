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

exports.updatePasswordByEmail = (email, password) => {
  return db.query("UPDATE users SET password=? WHERE email=?", [password, email]);
};
