import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ItemsList from './common/list'

// import AddProject from './'
// import AddTask from './addTask'

import { getProjects, selectProject, selectTask } from '../redux/actions/projectActions'
import { getUsers } from '../redux/actions/authActions'
import { getChats } from '../redux/actions/chatActions'



class dashboard extends Component {
    constructor() {
        super()
        this.state = {
            called:false
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.projects.updateForProject && !Object.keys(props.errors).length && !state.called) {
    //         console.log(!Object.keys(props.errors).length)
    //         console.log(props.projects.updateForProject)
    //         props.getProjects()
    //         return {called:true}
    //     }

    //     return null
    // }

    componentDidMount() {
        this.props.getProjects()
        this.props.getChats()
        this.props.getUsers()
    }

    componentDidUpdate() {
        // console.log(this.props.projects)
    }

    render() {
        // console.log(this.props)
        return (
            <div className="m-5 ">
                <div className="row h-100">
                    <div className="col border border-secondary">
                        <div className="clearfix">
                            <p className="my-3 float-left">Projects</p>
                            <Link to="/project"><button type="button" onClick={() => this.props.selectProject(null)} className="my-2 btn btn-outline-primary rounded-circle float-right" data-toggle="modal" data-target="#addNewProject">Add</button></Link>
                        </div>
                        <div className="mb-3 pl-3 border-top border-secondary">
                            <ItemsList items={this.props.projects.projects} />
                        </div>
                    </div>
                    <div className="col border border-secondary">
                        <div className="clearfix">
                            <p className="my-3 float-left">Tasks</p>
                            <Link to="/task"><button type="button" onClick={() => this.props.selectTask(null)} className="my-2 btn btn-outline-primary rounded-circle float-right" data-toggle="modal" data-target="#addNewTask">Add</button></Link>
                        </div>
                        <div className="mb-3 pl-3 border-top border-secondary">
                            {this.props.projects.projects.map((project, idx) => {
                                return <ItemsList items={project.tasks} key={idx} projectIdx={idx} />
                            })}
                        </div>
                    </div>
                    <div className="col border border-secondary">
                        <div className="clearfix">
                            <p className="my-3 float-left">Chats</p>
                            <Link to="/addchat"><button type="button" className="my-2 btn btn-outline-primary rounded-circle float-right" data-toggle="modal" data-target="#exampleModal">Add</button></Link>
                        </div>
                        <div className="mb-3 pl-3 border-top border-secondary">
                            <ItemsList items={this.props.chats.chats} chats={true} />
                        </div>
                    </div>
                </div>
                {/* <AddProject />
                <AddTask /> */}
            </div>


        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        projects: state.projects,
        errors: state.errors,
        chats: state.chats
    }
}

export default connect(mapStateToProps, { getProjects, getUsers, selectProject, selectTask, getChats })(dashboard)