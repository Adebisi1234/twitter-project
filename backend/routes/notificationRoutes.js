const express = require(express)
const router = express.Router()
const { getAllNotifications } = require("../controllers/notificationController")

router.get("/", getAllNotifications)
router.get("/newNotification", newNotification)

module.exports = router