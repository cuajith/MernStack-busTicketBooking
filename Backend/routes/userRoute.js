const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.route("/get-user-by-id").post(authMiddleware, userController.getUserById);
router.route("/get-all-users").post(authMiddleware, userController.getAllUsers);
router.route("/update-user-permission").post(authMiddleware, userController.updateUserPermission);

module.exports = router;
