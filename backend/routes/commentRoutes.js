const express = require("express")
const { newComment, getComments, like } = require("../controllers/commentController")
const router = express.Router()

router.get("/:id", getComments)
router.post("/", newComment)
router.post("/like", like)

module.exports = router