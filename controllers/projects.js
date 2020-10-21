const ProjectSchema = require('../models/PROJECT')
const TaskSchema = require('../models/TASK')
const UserSchema = require('../models/USER')

const validateProjectInput = require('../validation/project')
module.exports = {
    addProject: async (req, res) => {
        const { errors, isValid } = validateProjectInput(req.body)
        if (!isValid) {
            return res.status(400).json(errors)
        }

        let projectMembers = req.body.users

        if (!projectMembers.includes(req.user.email)) projectMembers.push(req.user.email)

        const users = await UserSchema.find({
            email: {
                $in: projectMembers
            }
        }).select({ _id: 1 })

        const newProject = new ProjectSchema({
            name: req.body.name,
            description: req.body.description,
            logo: req.body.logo,
            users: users,
        })

        newProject.save().then(project => {
            res.status(200).json(project)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    getProjects: async (req, res) => {
        try {
            let projects = await ProjectSchema.find({ users: req.user._id }).populate([
                { path: 'users', select: { '_id': 0, 'email': 1 } }
            ]).lean(true)

            const tasks = await TaskSchema.find().lean(true)
            projects.forEach((project, pIdx) => {
                projects[pIdx].tasks = []
                tasks.forEach((task, tIdx) => {
                    if (project._id.toString() === task.project.toString()) {
                        projects[pIdx].tasks.push(task)
                    }
                })
            })

            res.status(200).json(projects)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }

    },
    updateProject: async (req, res) => {
        const { projectId, name, logo, users, tasks } = req.body

        let projectMembers = users

        if (!projectMembers.includes(req.user.email)) projectMembers.push(req.user.email)

        const usersId = await UserSchema.find({
            email: {
                $in: projectMembers
            }
        }).select({ _id: 1 })

        const updatedProject = {}
        if (name) updatedProject.name = name
        if (logo) updatedProject.logo = logo
        if (users) updatedProject.users = usersId
        if (tasks) updatedProject.tasks = tasks
        ProjectSchema.findOneAndUpdate({ _id: projectId }, updatedProject, { new: true }).then(project => {
            // console.log(project)
            res.status(200).json({ success: true })
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    deleteProject: (req, res) => {

        const { projectId } = req.query

        ProjectSchema.findOneAndDelete({ _id: projectId }).then(project => {
            res.status(200).json(project)
        }).catch(err => {
            console.log(err)
            res.status(400).json(err)
        })

    },
}
