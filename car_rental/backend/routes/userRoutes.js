const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const userController = require("../controllers/userController");

router.get("/", verifyToken, isAdmin, userController.getAllUsers);
router.put("/:id", verifyToken, isAdmin, userController.updateUser);
router.delete("/:id", verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
