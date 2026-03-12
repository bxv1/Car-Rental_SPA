const db = require("../config/db");

exports.getAllCars = ()=>{

return db.query("SELECT * FROM cars");

};

exports.createCar = (brand,model,year,price,image,description)=>{

return db.query(
"INSERT INTO cars (brand,model,year,price_per_day,image,description) VALUES (?,?,?,?,?,?)",
[brand,model,year,price,image,description]
);

};

exports.deleteCar = (id)=>{

return db.query(
"DELETE FROM cars WHERE id=?",
[id]
);

};