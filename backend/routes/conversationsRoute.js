const router = require("express").Router();
const {
  newConv,
  getConv,
  getTwoConv,
} = require("../controllers/conversationsController");
//new conv

router.post("/", newConv);

//get conv of a user

router.get("/:userId", getConv);

// get conv includes two userId

router.get("/find/:firstUser/:secondUser", getTwoConv);

module.exports = router;
