const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema({
    handles: {
        type: [String],
        required: true
    },
    content: {
        type: String
    },
    from: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema)