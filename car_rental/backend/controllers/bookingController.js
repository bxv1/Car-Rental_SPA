const Booking = require("../models/bookingModel");

exports.bookCar = async (req,res)=>{

const user = req.user.id;

const {car_id,pickup_date,return_date,total_price} = req.body;

await Booking.createBooking(
user,
car_id,
pickup_date,
return_date,
total_price
);

res.json("Booking created");

};

exports.getMyBookings = async (req,res)=>{

const user = req.user.id;

const [rows] = await Booking.getUserBookings(user);

res.json(rows);

};