import React, { Component } from 'react'

import { connect } from 'react-redux'

import { getMessages } from '../redux/actions/chatActions'


let socket = new window.io()

class messages extends Component {

    constructor() {
        super()
        this.state = {
            text: '',
            selectedChat: {},
            messages: [],
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (props.chats.messages.length !== state.messages.length && !Object.keys(props.errors).length) {
            return { messages: props.chats.messages }
        }

        return null
    }

    msgReceiver = (message) => {
        console.log(this.state.messages[0])
        console.log(message)
        let msges = this.state.messages
        msges.push(message)
        this.setState({ messages: msges, text: '' })
    }

    componentDidMount() {
        // console.log(io())
        //TODO: remove tautologies from everywhere and simplify
        let idx = this.props.projects.selectedProject
        const selectedChat = this.props.chats.chats[idx]
        console.log(selectedChat)
        // console.log(this)
        if (!selectedChat) {
            this.props.history.push('/dashboard')
            return
        }
        this.props.getMessages(selectedChat._id)
        this.setState({ selectedChat: selectedChat })

        socket.emit('joinRoom', { id: selectedChat._id })

        socket.on('message', this.msgReceiver)

    }

    inputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()

        // console.log(this.state.text)

        const message = {
            chatId: this.state.selectedChat._id,
            body: this.state.text,
            author: this.props.auth.user.id
        }
        socket.emit('chatMessage', message)

    }

    componentWillUnmount() {
        socket.off('message', this.msgReceiver)
    }
    // messageBlocks = () => {
    //     return 
    // }

    render() {
        return (
            <div className="container mt-5 pt-5">
                <form onSubmit={this.submitHandler}>
                    <div className="">
                        <div className="overflow-auto border border-primary p-5" style={{ height: '600px' }}>
                            {this.state.messages.map((msg, idx) => {
                                let you = msg.author.email === this.props.auth.user.email
                                return <div key={idx} className={`d-flex ${you ? 'flex-row' : 'flex-row-reverse'} bd-highlight`}>
                                    <div className={`card border-${you ? 'success' : 'info'} mb-3`} >
                                        <div className="card-header">{msg.createdAt.slice(0, 10)}</div>
                                        <div className={`card-body text-${you ? 'success' : 'info'}`}>
                                            <h5 className="card-title">{you ? "You" : msg.author.email}</h5>
                                            <p className="card-text">{msg.body}</p>
                                        </div>
                                    </div>
                                </div>

                            })}
                        </div>
                        <div className="row my-5">
                            <input type='text' onChange={this.inputHandler} name='text' value={this.state.text} />
                            <input type='submit' value="send" />
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        chats: state.chats,
        projects: state.projects,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { getMessages })(messages)