const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = async (req,res)=>{

const {name,email,password,phone} = req.body;

const hash = await bcrypt.hash(password,10);

await User.createUser(name,email,hash,phone);

res.json({message:"User created"});

};

exports.login = async (req,res)=>{

const {email,password} = req.body;

const [rows] = await User.findUserByEmail(email);

if(rows.length===0)
return res.status(404).json("User not found");

const user = rows[0];

const valid = await bcrypt.compare(password,user.password);

if(!valid)
return res.status(401).json("Wrong password");

const token = jwt.sign(
{id:user.id,role:user.role},
process.env.JWT_SECRET,
{expiresIn:"24h"}
);

res.json({token,user});

};