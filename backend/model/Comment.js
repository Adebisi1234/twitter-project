const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
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
        type: String
    },
    commentCount: {
        type: Number,
        default: 0
    },
    PostId: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema)