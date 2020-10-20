const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assigner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project',
        required: true
    },
    dateOfCreation: {
        type: Date,
        default: new Date().toJSON()
    },
    dateOfExpiry: {
        type: Date,
        default: null
    },
    subTasks: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        dateOfCreation: {
            type: Date,
            default: new Date().toJSON()
        },
        subTasks: [{
            type: Object
        }]
    }],
    completed: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

module.exports = mongoose.model('task', TaskSchema)