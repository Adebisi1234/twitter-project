const express = require("express");
const {
  signup,
  signin,
  logout,
  google,
  googleLogin,
} = require("../controllers/authController");

const router = express.Router();

// Create a User
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/googleLogin", googleLogin);
router.get("/logout", logout);

module.exports = router;
