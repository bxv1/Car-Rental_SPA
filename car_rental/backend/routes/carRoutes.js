const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const carController = require("../controllers/carController");

router.get("/",carController.getCars);

router.post("/add",
verifyToken,
isAdmin,
carController.addCar
);

router.delete("/:id",
verifyToken,
isAdmin,
carController.deleteCar
);

module.exports = router;