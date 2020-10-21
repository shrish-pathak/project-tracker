const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const mongoURI = require('./config/keys').mongoURI

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
app.listen(port, () => { console.log(`server running on ${port}`) })