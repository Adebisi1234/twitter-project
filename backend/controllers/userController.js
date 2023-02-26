const User = require("../model/User")

const editProfile = async (req, res, next) => {
    try {
        if (req.body.username) {
            await User.findOneAndUpdate({ handle: req.body.handle }, {
                $set: {
                    username: req.body.username
                },
            })
        }
        if (req.body.bio) {
            await User.findOneAndUpdate({ handle: req.body.handle }, {
                $set: {
                    bio: req.body.bio
                },
            })
        }
        if (req.body.pp) {
            await User.findOneAndUpdate({ handle: req.body.handle }, {
                $set: {
                    pp: req.body.pp
                },
            })
        }
        if (req.body.coverImg) {
            await User.findOneAndUpdate({ handle: req.body.handle }, {
                $set: {
                    coverImg: req.body.coverImg
                },
            })
        }
        if (req.body.location) {
            await User.findOneAndUpdate({ handle: req.body.handle }, {
                $set: {
                    location: req.body.location
                },
            })
        }
        const user = await User.findOne({ handle: req.body.handle })
        res.status(200).json(user)

    } catch (err) {
        next(err)
    }
}

const newFollowers = async (req, res, next) => {
    try {
        await User.findOneAndUpdate({ handle: req.params.handle }, {
            $push: { followers: req.body.username }
        })
        await User.findOneAndUpdate(req.params.handle, {
            $inc: { followersCount: 1 }
        })
        res.status(200).json("Followed")
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const newFollowing = async (req, res, next) => {
    try {
        await User.findOneAndUpdate({ handle: req.params.handle }, {
            $push: { following: req.body.username }
        })
        await User.findOneAndUpdate({ handle: req.params.handle }, {
            $inc: { followingCount: 1 }
        })
        res.status(200).json("Following")
    } catch (err) {
        console.log(err)
        next(err)
    }
}



const getUser = async (req, res, next) => {
    try {
        const handle = req.params.handle
        const user = await User.findOne({ handle: handle })
        if (!user) return res.status(404).json("User not found")
        const { password, ...others } = user._doc
        res.status(200).json({ ...others })
    } catch (err) {
        next(err)
    }
}

const getSomeUser = async (req, res, next) => {
    try {
        let users = await User.find()
        shuffleArray(users)
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const unFollow = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.id, {
            $pull: { followers: req.body.handle },
        });
        await User.findByIdAndUpdate(req.body.id, {
            $inc: { followersCount: -1 },
        });
        res.status(200).json("Un-followed.")
    } catch (err) {
        next(err);
    }

};

module.exports = { getUser, newFollowers, newFollowing, editProfile, unFollow, getSomeUser }