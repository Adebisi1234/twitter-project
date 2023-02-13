const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema({
    receiver: {
        type: String,
        required: true
    },
    owner: String,
    content: [{ from: String, message: [String] }]
}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema)