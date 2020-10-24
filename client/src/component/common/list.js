import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectTask, selectProject, deleteProject, deleteTask } from '../../redux/actions/projectActions'
class list extends Component {

    updateSelection = (idx) => {
        console.log(this.props)
        if (typeof this.props.projectIdx === 'number') {
            this.props.selectProject(this.props.projectIdx)
            this.props.selectTask(idx)
            return
        }
        this.props.selectProject(idx)
    }


    render() {
        return (
            this.props.items.map((item, idx) => {
                let linkTo = "/project"

                if (typeof this.props.projectIdx === "number") linkTo = "/task"
                if (this.props.chats === true) linkTo = '/messages'

                return <div className="row" key={idx}>
                    <div className="col">

                        <Link to={linkTo}>
                            <div className="float-left"
                                key={idx}
                                onClick={() => {
                                    this.updateSelection(idx)
                                }}
                            >
                                {item.name}
                            </div>
                        </Link>
                        {item.completed ? <span className="ml-5">completed</span> : ''}
                        {this.props.chats!==true?<button type="button" className="close float-right" onClick={() => {
                            const params = {}

                            if (typeof this.props.projectIdx === "number") {
                                params.taskId = item._id
                                this.props.deleteTask(params)
                            } else {
                                params.projectId = item._id
                                this.props.deleteProject(params)
                            }
                            window.location.reload()
                        }}>
                            <span>&times;</span>
                        </button>:''}
                    </div>
                </div>
                // <div key={idx} className="">
                //        </div>
            })
        )
    }
}



export default connect(null, { selectProject, selectTask, deleteProject, deleteTask })(list)