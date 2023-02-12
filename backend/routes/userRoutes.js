const express = require("express")
const verifyJwt = require("../middleware/verifyJwt")
const { getUser, newFollowers, editProfile } = require("../controllers/userController")
const router = express.Router()

router.get("/:handle", getUser)
router.post("/new-follower/:handle", newFollowers)
router.post("/editProfile", verifyJwt, editProfile)

module.exports = router