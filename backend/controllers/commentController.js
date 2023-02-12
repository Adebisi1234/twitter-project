const Post = require("../model/Post")


const getComments = async (req, res, next) => {
    try {
        const comments = await Post.find({
            comment: true,
            PostId: req.params.id
        })
        if (!comments) return res.status(204).json("No comments")
        return res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}

const newComment = async (req, res, next) => {
    try {
        if (!req.body.PostId) return res.status(403).json("PostId required")
        const newComment = await Post({
            comment: true,
            ...req.body
        })
        await Post.findByIdAndUpdate(req.body.PostId, {
            $inc: { commentCount: 1 }
        })
        newComment.save()
        res.status(200).json(newComment)
    } catch (err) {
        next(err)
    }
}


const like = async (req, res, next) => {
    try {
        await Post.findByIdAndUpdate(req.body.id, {
            $inc: { likes: 1 }
        })
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}

module.exports = { getComments, newComment, like }