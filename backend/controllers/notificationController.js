const Notification = require("../model/Notification")
const getAllNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({
            userHandle: req.query.handle
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
        await newNote.save()
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }
}

module.exports = { getAllNotifications, newNotification }