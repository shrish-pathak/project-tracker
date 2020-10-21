const TaskSchema = require('../models/TASK')
const UserSchema = require('../models/USER')

module.exports = {
    addTask: async (req, res) => {
       
        const assignee = await UserSchema.findOne({ email: req.body.assignee }).select({ _id: 1 })

        const newTask = new TaskSchema({
            name: req.body.name,
            description: req.body.description,
            assigner: req.body.assigner,
            assignee: assignee._id,
            project: req.body.project,
            dateOfCreation: req.body.dateOfCreation,
            dateOfExpiry: req.body.dateOfExpiry,
            subTasks: [],//req.body.subTasks,
            status: req.body.status
        })

        newTask.save().then(Task => {
            res.status(200).json(Task)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    getTasks: (req, res) => {
        const projectId = req.query.projectId
        TaskSchema.find({ project: projectId }).then(Tasks => {
            res.status(200).json(Tasks)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    updateTask: async (req, res) => {
        const { _id, name, description,
            assigner, project
            , dateOfCreation, dateOfExpiry,
            subTasks, completed } = req.body

        const assignee = await UserSchema.find({ email: req.body.assignee }).select({ _id: 1 })

        const updatedTask = {}

        if (name) updatedTask.name = name
        if (description) updatedTask.description = description
        if (assigner) updatedTask.assigner = assigner
        if (assignee) updatedTask.assignee = assignee._id
        if (project) updatedTask.project = project
        if (dateOfCreation) updatedTask.dateOfCreation = dateOfCreation
        if (dateOfExpiry) updatedTask.dateOfExpiry = dateOfExpiry
        if (subTasks) updatedTask.subTasks = subTasks
        if (completed) updatedTask.completed = completed
        TaskSchema.findOneAndUpdate({ _id: _id }, updatedTask, { new: true }).then(Task => {
            res.status(200).json(Task)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    deleteTask: (req, res) => {
        const { taskId } = req.query

        TaskSchema.findOneAndDelete({ _id: taskId }).then(Task => {
            res.status(200).json(Task)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })

    },
}

