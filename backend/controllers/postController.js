const Post = require("../model/Post")
const User = require("../model/User")
const addPost = async (req, res, next) => {
    try {
        const newPost = new Post({
            ...req.body,
            username: req.body.username,
            handle: req.body.handle,
        })
        await User.findOneAndUpdate({ handle: req.body.handle }, {
            $inc: { posts: 1 }
        })
        newPost.save()
        res.status(200).json(newPost)
    } catch (err) {
        next(err)
    }
}
const getAllPosts = async (req, res, next) => {
    try {
        const handle = req.query.handle
        if (!handle) {
            const posts = await Post.find()
            return res.status(200).json(posts)
        }
        const posts = await Post.find({
            handle
        })
        res.status(200).json(posts)
    } catch (err) {
        next(err)
    }

}
const getPost = async (req, res, next) => {
    try {
        const id = req.params.id
        console.log(id);
        const posts = await Post.findOne({ _id: id })
        res.status(200).json(posts)
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
const retweet = async (req, res, next) => {
    try {
        await Post.findByIdAndUpdate(req.body.id, {
            $inc: { retweet: 1 }
        })
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}
const dislike = async (req, res, next) => {
    try {
        await Post.findByIdAndUpdate(req.body.id, {
            $inc: { likes: -1 }
        })
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}
const undoRetweet = async (req, res, next) => {
    try {
        await Post.findByIdAndUpdate(req.body.id, {
            $inc: { retweet: -1 }
        })
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}


const search = async (req, res, next) => {
    const query = req.query.q;
    console.log(query);
    try {
        const posts = await Post.find({
            content: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}


module.exports = { search, like, retweet, dislike, undoRetweet, getAllPosts, getPost, addPost }