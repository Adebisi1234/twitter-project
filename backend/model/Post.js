const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    handle: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: Boolean,
        default: false
    },
    commentCount: {
        type: Number,
        default: 0
    },
    audioUrl: {
        type: String
    },
    title: {
        type: String
    },
    PostId: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model("Post", postSchema)