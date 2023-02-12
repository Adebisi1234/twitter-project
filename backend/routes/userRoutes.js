const express = require("express")
const { getUser, newFollowers, editProfile, unFollow } = require("../controllers/userController")
const router = express.Router()

router.get("/:handle", getUser)
router.post("/new-follower/:handle", newFollowers)
router.post("/unfollow/", unFollow)
router.post("/editProfile", editProfile)

module.exports = router