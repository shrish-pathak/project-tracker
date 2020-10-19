const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const mongoURI = require('./config/keys').mongoURI

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

app.get('/test', (req, res) => {
    res.send("working")
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 4000
app.listen(port, () => { console.log(`server running on ${port}`) })