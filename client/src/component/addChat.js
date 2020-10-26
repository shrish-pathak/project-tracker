import React, { Component } from 'react'

import { connect } from 'react-redux'

import { addChat } from '../redux/actions/chatActions'

class addNewChat extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            participants: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.chats.updateForChat) {
            props.history.push('/dashboard')
        }
        return null
    }

    inputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addMembers = (e) => {
        console.log(e.target.value)
        if (this.state.participants.includes(e.target.value)) return
        let members = this.state.participants
        members.push(e.target.value)
        this.setState({ participants: members })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        this.props.addChat(this.state)
    }

    render() {
        return (
            <div className="container mt-5 p-5 border">
                <form onSubmit={this.submitHandler}>
                    <div className="container ">
                        <span className="row mb-4"> add Chat</span>
                        <div className="row">
                            <div className="col">
                                <span>Members</span>
                                <div>
                                    {this.state.participants.map((user, idx) => {
                                        return <div key={idx}>{user}</div>
                                    })}
                                </div>
                            </div>

                            <div className="col">
                                <div className="row my-3">
                                    <input type="text" name="name" onChange={this.inputHandler} value={this.state.name} placeholder="Chat Name" required />
                                    {this.state.name.length < 3 ? <span className="text-danger">Name must be more than 2 characters</span> : ''}
                                </div>

                                <span className="row mt-3">Select Members from List</span>
                                <select className="row" onChange={this.addMembers} required={this.state.participants.length ? false : true}>
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors: state.errors,
        chats:state.chats
    }
}
export default connect(mapStateToProps, { addChat })(addNewChat)