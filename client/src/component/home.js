import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

class home extends Component {
    componentDidUpdate() {
        // console.log(this.props)
    }
    render() {
        return (
            <div>
                <div className="row h-100">
                    <div className="col-4">
                        <div className="container m-5 p-5">
                            <h4 className="row text-info">
                                Keep track of your project
                            </h4>
                            <Link to='/signup'>
                                <button type="button" className="row btn btn-outline-info">
                                    Start Now
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-8 h-100" style={{ backgroundImage: `url(${'https://liquidplanner-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/iStock-905819004.jpg'})` }}>
                    </div>
                </div>
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

export default connect(mapStateToProps, {})(home)


// https://liquidplanner-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/iStock-905819004.jpg