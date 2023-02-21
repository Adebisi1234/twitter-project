const Message = require("../model/Message")

const getMessages = async (req, res, next) => {
    try {
        const { owner, receiver } = req.query
        const all = await Message.find({ owner: owner, receiver: receiver })
        if (!all) return res.status(404).json("No messages")
        res.status(200).json(all.sort((a, b) => a.createdAt - b.createdAt))

    } catch (err) {
        next(err)
    }
}

const getAllMessages = async (req, res, next) => {
    try {
        if (req.query.owner) {
            const all = await Message.find({ owner: req.query.owner })
            res.status(200).json(all)
        } else {
            const all = await Message.find()
            res.status(200).json(all)
        }

    } catch (err) {
        next(err)
    }
}
const newMessage = async (req, res, next) => {
    try {
        const { owner, receiver } = req.body

        const all = await Message.findOne({ owner: owner, receiver: receiver })

        if (all) {
            const newMessage = await Message.findOneAndUpdate({ owner: owner, receiver: receiver }, {
                $push: { content: req.body.content }
            }, { new: true })
            res.status(200).json(newMessage)
        } else {
            const newMessage = await Message({
                ...req.body
            })
            await newMessage.save()
            res.status(200).json(newMessage)
        }


    } catch (err) {
        next(err)
    }
}

module.exports = { getMessages, newMessage, getAllMessages }