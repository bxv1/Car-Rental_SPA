const db = require("../config/db");

exports.createBooking = (user,car,pickup,returnDate,total)=>{

return db.query(
"INSERT INTO bookings (user_id,car_id,pickup_date,return_date,total_price) VALUES (?,?,?,?,?)",
[user,car,pickup,returnDate,total]
);

};

exports.getUserBookings = (user)=>{

return db.query(
"SELECT * FROM bookings WHERE user_id=?",
[user]
);

};