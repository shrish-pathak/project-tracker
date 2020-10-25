import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTask, editTask } from '../redux/actions/projectActions'


class addNewTask extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            description: '',
            assigner: '',
            assignee: '',
            project: '',
            dateOfCreation: '',
            dateOfExpiry: '',
            editTask: false,
            completed: false
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (props.projects.selectedTask !== null && !state.editTask) {
            let projectIdx = props.projects.selectedProject
            let taskIdx = props.projects.selectedTask
            const newState = props.projects.projects[projectIdx].tasks[taskIdx]

            newState.editTask = true
            return newState
        }

        if (!state.assigner) {
            return {
                assigner: props.auth.user.id
            }
        }

        if (props.projects.updateForProject) {
            props.history.push('/dashboard')
        }
        return null
    }

    inputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    markAsComplete = (e) => {
        // console.log(e.target.defaultChecked)
        this.setState({ [e.target.name]: !this.state[e.target.name] })
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    submitHandler = (e) => {
        e.preventDefault()
        if (this.state.editTask) {
            this.props.editTask(this.state)
        } else {
            this.props.addTask(this.state)
        }
    }

    renderError = () => {
        let errorsDiv = []
        let i = 0
        for (let error in this.props.errors.data) {
            i++
            errorsDiv.push(<p className="text-danger" key={i}>
                {this.props.errors.data[error]}
            </p>)
        }

        return errorsDiv.length ? errorsDiv : ''
    }

    render() {
        // console.log(this.state)
        return (
            <div className="container mt-5 p-5 border">
                <form onSubmit={this.submitHandler}>
                    <div className="container">
                        <div>
                            {this.renderError()}
                        </div>
                        <span className="row mb-4"> Task Editor</span>
                        <div className="row">
                            <div className="col">
                                <span>Task belongs to Project Id</span>
                                <div>
                                    {this.state.project}
                                </div>

                            </div>

                            <div className="col">
                                {this.state.editTask ? <div className="row my-3">
                                    <span className="mr-5">Completed</span>
                                    <input style={{ height: '25px', width: '25px' }} type="checkbox" name="completed" defaultChecked={this.state.completed} onChange={this.markAsComplete} />
                                </div> : ''}
                                <div className="row my-3">
                                    <input type="text" name="name" onChange={this.inputHandler} value={this.state.name} placeholder="Task Title" required />
                                </div>
                                <div className="row my-3">
                                    <input type="text" name="description" onChange={this.inputHandler} value={this.state.description} placeholder="Task Description" required />
                                </div>

                                <span className="row mt-3">Assign</span>


                                <select className="row" name="assignee" onChange={this.inputHandler} value={this.state.assignee} required>
                                    <option></option>
                                    {this.props.auth.users.map((user, idx) => {
                                        return <option key={idx} value={user.email}>{user.email}</option>
                                    })}
                                </select>

                                <span className="row mt-3">Select Project from List</span>
                                <select className="row" name="project" onChange={this.inputHandler} value={this.state.project} required>
                                    <option></option>
                                    {this.props.projects.projects.map((project, idx) => {
                                        return <option key={idx} value={project._id}>{project.name}</option>
                                    })}
                                </select>

                                <span className="row mt-3">Start</span>
                                <input type="date" className="row" name="dateOfCreation" onChange={this.inputHandler} value={this.state.dateOfCreation.slice(0, 10)} required />
                                <span className="row mt-3">DeadLine</span>
                                <input type="date" className="row" name="dateOfExpiry" onChange={this.inputHandler} value={this.state.dateOfExpiry.slice(0, 10)} required />

                            </div>
                        </div>
                    </div>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        projects: state.projects,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { addTask, editTask })(addNewTask)