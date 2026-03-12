const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const bookingController = require("../controllers/bookingController");

router.post("/create", verifyToken, bookingController.bookCar);
router.get("/my", verifyToken, bookingController.getMyBookings);
router.get("/", verifyToken, isAdmin, bookingController.getAllBookings);
router.put("/:id/status", verifyToken, isAdmin, bookingController.updateBookingStatus);

module.exports = router;
