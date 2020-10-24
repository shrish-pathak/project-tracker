import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/authActions'
class login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
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
        this.props.loginUser(this.state)
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
                    <div className="form-group">
                        <h4>Login</h4>
                    </div>
                    <div className="form-group">
                        <input placeholder="Email" onChange={this.inputHandler} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <input placeholder="Password" onChange={this.inputHandler} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
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

export default connect(mapStateToProps, { loginUser })(login)