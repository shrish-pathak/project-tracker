import React, { Component } from 'react'
import { registerUser } from '../redux/actions/authActions'
import { connect } from 'react-redux'

class signup extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            password2: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.auth.isAuthenticated) {
            props.history.push('/dashboard')
        }

        return null
    }

    inputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        this.props.registerUser(this.state)
    }

    guestLogin = () => {
        const guest = {
            firstName: 'guest',
            lastName: 'guest',
            username: 'guest',
            email: 'guest@guest.com',
            password: 'guest123',
            password2: 'guest123'
        }
        this.props.registerUser(guest)
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
            <div className="container mt-5">
                <form onSubmit={this.submitHandler}>
                    <div>
                        {this.renderError()}
                    </div>

                    <div className="row form-group">
                        <h4>Sign Up</h4>
                    </div>

                    <div className="row form-group">
                        <div className="col">
                            <input type="text" onChange={this.inputHandler} name="firstName" className="form-control" placeholder="First Name" />
                        </div>
                        <div className="col">
                            <input type="text" onChange={this.inputHandler} name="lastName" className="form-control" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <input placeholder="User Name" onChange={this.inputHandler} name="username" type="text" className="form-control" id="exampleInputUsername1" aria-describedby="UsernameHelp" />
                    </div>
                    <div className="form-group">
                        <input placeholder="Email" onChange={this.inputHandler} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <input placeholder="Password" onChange={this.inputHandler} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="form-group">
                        <input placeholder="Confirm Password" onChange={this.inputHandler} name="password2" type="password" className="form-control" id="exampleInputPassword2" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <button onClick={this.guestLogin} className="btn btn-primary float-right">Guest Login</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { registerUser })(signup)