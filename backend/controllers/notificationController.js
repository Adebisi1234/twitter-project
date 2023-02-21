const Notification = require("../model/Notification")
const User = require("../model/User")
const getAllNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({
            userHandle: req.params.handle
        })
        res.status(200).json(notifications)
    } catch (err) {
        next(err)
    }
}

const newNotification = async (req, res, next) => {
    try {
        const newNote = await Notification(
            {
                ...req.body
            }
        )
        const user = await User.findOneAndUpdate({ handle: req.body.handle }, {
            $inc: { notification: 1 }
        })
        user.save()
        await newNote.save()
        res.status(200).json(newNote)
    } catch (err) {
        next(err)
    }
}

module.exports = { getAllNotifications, newNotification }