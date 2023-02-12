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
        res.status(200).json("change successful")

    } catch (err) {
        next(err)
    }
}

const newFollowers = async (req, res, next) => {
    try {
        await User.findOneAndUpdate({ handle: req.params.handle }, {
            $push: { followers: req.body.username }
        })
        await User.findOneAndUpdate(req.body.id, {
            $inc: { followersCount: 1 }
        })
        res.status(200).json("Followed")
    } catch (err) {
        console.log(err)
        next(err)
    }
}


const getUser = async (req, res, next) => {
    try {
        const handle = req.params.handle
        const user = await User.findOne({ handle: handle })
        const { password, ...others } = user._doc
        res.status(200).json({ ...others })
    } catch (err) {
        next(err)
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

module.exports = { getUser, newFollowers, editProfile, unFollow }