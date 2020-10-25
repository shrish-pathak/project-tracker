import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addProject, editProject } from '../redux/actions/projectActions'



class addNewProject extends Component {
    constructor() {
        super()
        this.state = {
            projectId: '',
            name: '',
            description: '',
            logo: '',
            users: [],
            editProject: false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props)
        if (props.projects.selectedProject !== null && !state.editProject) {
            const idx = props.projects.selectedProject
            const selectedProject = props.projects.projects[idx]
            const users = selectedProject.users.map(user => user.email)
            return {
                projectId: selectedProject._id,
                name: selectedProject.name,
                description: selectedProject.description,
                logo: selectedProject.logo,
                users: users,
                editProject: true
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

    addMembers = (e) => {
        console.log(e.target.value)
        if (this.state.users.includes(e.target.value)) return
        let members = this.state.users
        members.push(e.target.value)
        this.setState({ users: members })
    }

    submitHandler = (e) => {
        e.preventDefault()

        if (this.state.editProject) {
            this.props.editProject(this.state)
        } else {
            this.props.addProject(this.state)
        }
    }

    componentDidUpdate() {
        console.log(this.state)
        console.log(this.props)
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
        return (
            <div className="container mt-5 p-5 border">
                <form onSubmit={this.submitHandler}>
                    <div className="container ">
                        <div>
                            {this.renderError()}
                        </div>
                        <span className="row mb-4">Project Editor</span>
                        <div className="row">
                            <div className="col">
                                <span>Project Members</span>
                                <div>
                                    {this.state.users.map((user, idx) => {
                                        return <div key={idx}>{user}</div>
                                    })}
                                </div>
                            </div>

                            <div className="col">
                                <div className="row my-3">
                                    <input type="text" name="name" onChange={this.inputHandler} value={this.state.name} placeholder="Project Title" required />
                                    {this.state.name.length < 3 ? <span className="text-danger">Title must be more than 2 characters</span> : ''}
                                </div>
                                <div className="row my-3">
                                    <input type="text" name="description" onChange={this.inputHandler} value={this.state.description} placeholder="Project Description" required />
                                </div>

                                <span className="row mt-3">Select Members from List</span>
                                <select className="row" onChange={this.addMembers} required={this.state.users.length ? false : true}>
                                    <option></option>
                                    {this.props.auth.users.map((user, idx) => {
                                        return <option key={idx} value={user.email}>{user.email}</option>
                                    })}
                                </select>
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

export default connect(mapStateToProps, { addProject, editProject })(addNewProject)
