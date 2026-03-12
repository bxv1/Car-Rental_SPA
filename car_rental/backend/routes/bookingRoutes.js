const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const bookingController = require("../controllers/bookingController");

router.post("/create",
verifyToken,
bookingController.bookCar
);

router.get("/my",
verifyToken,
bookingController.getMyBookings
);

module.exports = router;