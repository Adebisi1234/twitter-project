const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema({
    senderUsername: {
        type: String,
        required: true
    },
    receiverUsername: {
        type: String,
        required: true
    },
    messages: {
        type: [Object]
    }
}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema)