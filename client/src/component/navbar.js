import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {logoutUser} from '../redux/actions/authActions'
class navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Project Tracker</Link>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="col">
                        <ul className="navbar-nav float-left">
                            {this.props.auth.isAuthenticated ? <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li> : ''}
                        </ul>
                        {this.props.auth.isAuthenticated ?//''
                            <div className="btn-group dropleft float-right">
                                <button className="btn btn-secondary rounded-circle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.props.auth.user.username}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link className="dropdown-item" to="/settings">settings</Link>
                                    <Link className="dropdown-item" to="/" onClick={()=>this.props.logoutUser()}>logout</Link>
                                </div>
                            </div>
                            :
                            <ul className="navbar-nav float-right">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </ul>}
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {logoutUser})(navbar)