const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
    pp: {
        type: String
    },
    coverImg: {
        type: String
    },
    posts: {
        type: [String]
    },
    location: {
        type: String
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)