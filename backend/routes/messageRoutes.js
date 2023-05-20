const express = require("express");
const router = express.Router();
const { getMessages, newMessage } = require("../controllers/messageController");

router.get("/message/:id", getMessages);
router.post("/new", newMessage);

module.exports = router;
