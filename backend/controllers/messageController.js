import Message from "../model/Message"
export const getMessages = async (req, res, next) => {

}

export const sendMessage = async (req, res, next) => {
    try {
        const newMessage = new Message(
            {
                senderUsername: req.body.senderUsername,
                receiverUsername: req.body.receiverUsername,
                messages: {
                    senderUsername: req.body.senderUsername,
                    message: req.body.message
                }
            }
        )
        newMessage.save()
        res.sendStatus(200)
    } catch (err) {
        next(err)
    }

}