const express = require("express")
const { addPost, getAllPosts, retweet, getPost, like, search, dislike, undoRetweet } = require("../controllers/postController")
const router = express.Router()

router.get("/allPosts", getAllPosts)
router.get("/search", search)
router.get("/posts/:id", getPost)
router.post("/newPost", addPost)
router.post("/like", like)
router.post("/retweet", retweet)
router.post("/dislike", dislike)
router.post("/undoretweet", undoRetweet)

module.exports = router