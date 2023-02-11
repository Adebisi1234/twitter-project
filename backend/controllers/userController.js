const User = require("../model/User")

export const editProfile = async (req, res, next) => {
    try {
        if (req.params.username) {
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    username: req.params.username
                },
            })
            res.status(200).json("change successful")
        }
        if (req.params.bio) {
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    bio: req.params.bio
                },
            })
            res.status(200).json("change successful")
        }
        if (req.params.pp) {
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    pp: req.params.pp
                },
            })
            res.status(200).json("change successful")
        }
        if (req.params.coverImg) {
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    coverImg: req.params.coverImg
                },
            })
            res.status(200).json("change successful")
        }
        if (req.params.location) {
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    location: req.params.location
                },
            })
            res.status(200).json("change successful")
        }

    } catch (err) {

    }
}

export const newFollowers = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $push: { followers: req.body.username }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { followersCount: 1 }
        })
        res.status(200).json("Followed")
    } catch (err) {
        next(err)
    }
}
