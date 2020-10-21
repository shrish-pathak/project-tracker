const ChatSchema = require('../models/CHAT')
const UserSchema = require('../models/USER')

module.exports = {
    getChats: (req, res) => {
        ChatSchema.find({ participants: req.user.id }).select({participants:0}).then(chats => {
            console.log(chats)
            res.status(200).json(chats)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    getChat: (params) => {
        return ChatSchema.findOne({ _id: params.id }).lean(true)
    },
    addChat: async (req, res) => {
        const { name, participants } = req.body

        let members = participants

        if (!members.includes(req.user.email)) members.push(req.user.email)

        const users = await UserSchema.find({
            email: {
                $in: members
            }
        }).select({ _id: 1 })


        const chat = new ChatSchema({
            name: name,
            participants: users
        })

        chat.save().then(chat => {
            console.log(chat)
            res.status(200).json({ success: true })
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    editChat: (req, res) => {
        const { name, participants } = req.body

        const updatedChat = {}
        if (name) updatedChat.name = name
        if (participants) updatedChat.participants = participants

        ChatSchema.findOneAndUpdate({ _id: req.body.chatId }, { $set: updatedChat }, { new: true }).then(chat => {
            console.log(chat)

            res.status(200).json(chat)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    deleteChat: (req, res) => {
        ChatSchema.findOneAndDelete({ _id: req.body.chatId }).then(chat => {
            console.log(chat)

            res.status(200).json(chat)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
}