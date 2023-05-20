const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    actionHandle: {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    PostId: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Notification", notificationSchema)