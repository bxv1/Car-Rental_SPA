const Booking = require("../models/bookingModel");

exports.bookCar = async (req, res) => {
  const user = req.user.id;
  const { car_id, pickup_date, return_date, total_price } = req.body;

  await Booking.createBooking(user, car_id, pickup_date, return_date, total_price);
  res.json("Booking created");
};

exports.getMyBookings = async (req, res) => {
  const user = req.user.id;
  const [rows] = await Booking.getUserBookings(user);

  res.json(rows);
};

exports.getAllBookings = async (req, res) => {
  const [rows] = await Booking.getAllBookings();
  res.json(rows);
};

exports.updateBookingStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  const allowed = ["pending", "approved", "cancelled", "completed"];
  if (!allowed.includes(status)) {
    return res.status(400).json("Invalid booking status");
  }

  await Booking.updateBookingStatus(id, status);
  return res.json("Booking status updated");
};
