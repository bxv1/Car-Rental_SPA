const Car = require("../models/carModel");

exports.getCars = async (req,res)=>{

const [cars] = await Car.getAllCars();
res.json(cars);

};

exports.addCar = async (req,res)=>{

const {brand,model,year,price,image,description} = req.body;

await Car.createCar(brand,model,year,price,image,description);

res.json("Car added");

};

exports.deleteCar = async (req,res)=>{

const id = req.params.id;

await Car.deleteCar(id);

res.json("Car removed");

};