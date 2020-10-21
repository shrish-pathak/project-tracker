const MessageSchema = require('../models/MESSAGE')
// const Socket
module.exports = {
    addMessage: (message) => {
        const newMessage = new MessageSchema({
            chat: message.chatId,
            body: message.body,
            author: message.author
        })

        newMessage.save().then(message => {
            console.log(message)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    getMessages: (req, res) => {
        MessageSchema.find({ chat: req.query.chatId }).populate({
            path: 'author', select: { _id: 0,
                 email:1 }
        }).then(messages => {
            res.status(200).json(messages)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }
}