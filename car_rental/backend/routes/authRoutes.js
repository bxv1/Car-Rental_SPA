const router = require("express").Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.get("/me", verifyToken, authController.getMyProfile);
router.put("/me", verifyToken, authController.updateMyProfile);

module.exports = router;
