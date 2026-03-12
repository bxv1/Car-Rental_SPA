const db = require("../config/db");

exports.createBooking = (user, car, pickup, returnDate, total) => {
  return db.query(
    "INSERT INTO bookings (user_id,car_id,pickup_date,return_date,total_price) VALUES (?,?,?,?,?)",
    [user, car, pickup, returnDate, total]
  );
};

exports.getUserBookings = (user) => {
  return db.query("SELECT * FROM bookings WHERE user_id=? ORDER BY created_at DESC", [user]);
};

exports.getAllBookings = () => {
  return db.query(
    "SELECT b.*, u.name AS user_name, u.email AS user_email, c.brand, c.model FROM bookings b LEFT JOIN users u ON b.user_id=u.id LEFT JOIN cars c ON b.car_id=c.id ORDER BY b.created_at DESC"
  );
};

exports.updateBookingStatus = (id, status) => {
  return db.query("UPDATE bookings SET status=? WHERE id=?", [status, id]);
};
