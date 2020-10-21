const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const mongoURI = require('./config/keys').mongoURI
const server = require('http').Server(app)

const passport = require('passport')

const users = require('./routes/users')
const projects = require('./routes/projects')
const tasks = require('./routes/tasks')
const chats = require('./routes/chats')
const messages = require('./routes/messages')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(mongoURI).then(() => {
    // console.log(mongoURI)
    console.log("successfully connected to mongoDB")
}).catch(err => {
    console.log(err)
    console.log("could not connect to mongoDB")
    process.exit(1)
})

require('./config/passport')(passport)

app.get('/test', (req, res) => {
    res.send("working")
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/users', users)
app.use('/api/projects', projects)
app.use('/api/tasks', tasks)
app.use('/api/chats', chats)
app.use('/api/messages/', messages)


const port = process.env.PORT || 4000
const io = require('socket.io')(server)

const { addMessage } = require('./controllers/messages')
const { getChat } = require('./controllers/chats')
const UserSchema = require('./models/USER')

io.on('connection', (socket) => {
    socket.on('joinRoom', (data) => {
        console.log(data)

        const chat = getChat(data)

        socket.join(data.id)

        // socket.emit('message', data)

        // socket.broadcast.to(data.id).emit('message', data)

        // io.to(data.id).emit("roomUsers", data)
        // io.emit('chatid123',data)
        // socket.to(data.id).emit('chat', data)
    })

    socket.on('chatMessage', async msg => {
        console.log(msg)
        addMessage(msg)
        const user = await UserSchema.findOne({ _id: msg.author }).select({ _id: 0, email: 1 })
        msg.author = user
        msg.createdAt = new Date().toJSON()
        io.to(msg.chatId).emit('message', msg)
    })
})
server.listen(port, () => { console.log(`server running on ${port}`) })