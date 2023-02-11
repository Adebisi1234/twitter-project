import Post from "../model/Post"
export const addPost = async (req, res, next) => {
    try {
        const newPost = new Post({
            ...req.body,
            username: req.params.username,
            handle: req.params.handle,
        })
        newPost.save()
        res.sendStatus(200)
    } catch (err) {

    }
}
export const getPosts = async (req, res, next) => {
    try {
        const id = req.params.id
        const posts = await Post.find(id ? id : {})
        res.status(200).json(posts)
    } catch (err) {
        next(err)
    }

}

export const like = async (req, res, next) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            $inc: { likes: 1 }
        })
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}