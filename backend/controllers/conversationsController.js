const Conversation = require("../model/Conversation");

const newConv = async (req, res, next) => {
  try {
    const newConversation = new Conversation({
      members: [req.body.sender, req.body.receiver],
    });

    await newConversation.save();
    res.status(200).json(newConversation);
  } catch (err) {
    next(err);
  }
};

const getConv = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.user] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};

const getTwoConv = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUser, req.params.secondUser] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};
module.exports = { getConv, newConv, getTwoConv };
