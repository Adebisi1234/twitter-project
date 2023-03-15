const Notification = require("../model/Notification");
const Post = require("../model/Post");
const User = require("../model/User");
const addPost = async (req, res, next) => {
  try {
    const wordRegex = /\w/;
    if (!wordRegex.test(req.body.content) && !req.body.audioUrl) {
      return res.status(400).json("Post must contain some words");
    }
    const hashTag = /@\S+/gi;
    const hashes = req.body.content.match(hashTag);

    const newPost = new Post({
      ...req.body,
    });
    await User.findOneAndUpdate(
      { handle: req.body.handle },
      {
        $inc: { posts: 1 },
      }
    );
    await newPost.save();

    if (hashes) {
      const post = await Post.findOne({ content: req.body.content });
      const noteFunction = async (hash) => {
        const note = new Notification({
          actionHandle: post.handle,
          handle: hash,
          username: post.username,
          action: "mentioned you in a post",
          PostId: post._id,
          pp: post.pp,
          text: post.content.slice(1, 100),
        });
        const noteUser = await User.findOneAndUpdate(
          { handle: hash },
          { $inc: { notification: 1 } }
        );
        await note.save();
        await noteUser.save();
      };
      for (const hash of hashes) {
        noteFunction(hash);
      }
    }

    res.status(200).json(newPost);
  } catch (err) {
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const handle = req.query.handle;
    if (!handle) {
      const posts = await Post.find().sort({ createdAt: -1 });
      return res.status(200).json(posts);
    }
    const posts = await Post.find({
      handle,
    });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};
const getPost = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const posts = await Post.findOne({ _id: id });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

const like = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $inc: { likes: 1 },
    });
    const user = user.findOne({ handle: req.body.handle });
    if (!user.likes.includes(req.body.id)) {
      await User.findOneAndUpdate(
        { handle: req.body.handle },
        {
          $push: { likes: req.body.id },
        }
      );
    }
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
const retweet = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $inc: { retweet: 1 },
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
const dislike = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $inc: { likes: -1 },
    });
    const user = user.findOne({ handle: req.body.handle });
    if (!user.likes.includes(req.body.id)) {
      await User.findOneAndUpdate(
        { handle: req.body.handle },
        {
          $pull: { likes: req.body.id },
        }
      );
    }
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
const undoRetweet = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $inc: { retweet: -1 },
    });
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

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
};

module.exports = {
  search,
  like,
  retweet,
  dislike,
  undoRetweet,
  getAllPosts,
  getPost,
  addPost,
};
