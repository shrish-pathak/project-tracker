const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    logo:{
        type:String,
    },
    users:[{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }]    
},{timestamps:true})

module.exports = mongoose.model('project',ProjectSchema)