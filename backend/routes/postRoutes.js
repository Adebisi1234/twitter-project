const express = require("express")
const { addPost, getAllPosts, getPost, like, search } = require("../controllers/postController")
const router = express.Router()

router.get("/allPosts", getAllPosts)
router.get("/search", search)
router.get("/posts/:id", getPost)
router.post("/newPost", addPost)
router.post("/like", like)

module.exports = router