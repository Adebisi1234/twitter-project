const mongoose = require("mongoose")
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    userHandle: {
        type: String
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
        type: [String]
    },
    pp: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model("Notification", notificationSchema)