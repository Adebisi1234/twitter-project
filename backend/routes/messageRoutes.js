const express = require("express")
const router = express.Router()
const { getAllMessages, getMessages, newMessage } = require("../controllers/messageController")

router.get("/all", getAllMessages)
router.get("/message", getMessages)
router.post("/new", newMessage)

module.exports = router