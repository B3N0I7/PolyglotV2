const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authMiddleware = require("./../middlewares/authMiddleware");

router.post("/signup", userController.SignUp);
router.post("/signin", userController.SignIn);
router.get("/check-auth", authMiddleware, userController.checkAuth);
router.post("/signout", userController.SignOut);

module.exports = router;
