const express = require("express");
const router = express.Router();
const {
  getAllNotifications,
  newNotification,
} = require("../controllers/notificationController");

router.get("/all/:handle/:page?", getAllNotifications);
router.post("/new", newNotification);

module.exports = router;
