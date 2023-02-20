const express = require("express")
const { signup, signin, logout, google } = require("../controllers/authController")

const router = express.Router()

// Create a User
router.post("/signup", signup)
router.post("/signin", signin)
router.post("/google", google)
router.get("/logout", logout)

module.exports = router