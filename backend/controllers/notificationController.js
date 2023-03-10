const Notification = require("../model/Notification");
const User = require("../model/User");
const getAllNotifications = async (req, res, next) => {
  try {
    const { handle } = req.params;
    const notifications = await Notification.find({
      handle: handle,
    })
      .sort({ createdAt: -1 })
      .limit(40);
    await User.findOneAndUpdate(
      { handle: handle },
      {
        $set: { notification: 0 },
      }
    );
    res.status(200).json(notifications);
  } catch (err) {
    next(err);
  }
};

// Pagination.skip()

const newNotification = async (req, res, next) => {
  try {
    const newNote = await Notification({
      ...req.body,
    });
    await User.findOneAndUpdate(
      { handle: req.body.handle },
      {
        $inc: { notification: 1 },
      }
    );
    await newNote.save();
    res.status(200).json(newNote);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllNotifications, newNotification };
