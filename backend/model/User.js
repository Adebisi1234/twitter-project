const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    handle: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
        type: String,
        required: true,
    },
    followers: {
        type: [String],
    },
    followersCount: {
        type: Number,
        default: 0
    },
    following: {
        type: [String],
    },
    followingCount: {
        type: Number,
        default: 0
    },
    pp: {
        type: String
    },
    coverImg: {
        type: String
    },
    posts: {
        type: Number,
        default: 0
    },
    location: {
        type: String
    },
    messageCount: {
        type: Number,
        default: 0
    },
    fromGoogle: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)