const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.get('/test', (req, res) => {
    res.send("working")
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const port = process.env.PORT || 4000
app.listen(port, () => { console.log(`server running on ${port}`) })