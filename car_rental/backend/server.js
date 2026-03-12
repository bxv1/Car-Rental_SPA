const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/cars",carRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/users",userRoutes);

app.listen(process.env.PORT,()=>{
console.log("Server running");
});