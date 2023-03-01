const express = require("express");
const {
  getUser,
  newFollowers,
  newFollowing,
  editProfile,
  unFollow,
  getSomeUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/some:handle", getSomeUser);
router.get("/get/:handle", getUser);
router.post("/new-follower/:handle", newFollowers);
router.post("/new-following/:handle", newFollowing);
router.post("/unfollow/", unFollow);
router.post("/editProfile", editProfile);

module.exports = router;
