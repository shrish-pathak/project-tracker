const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    participants:[{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }]
},{
    timestamps:true
})

module.exports = mongoose.model('chat',ChatSchema)