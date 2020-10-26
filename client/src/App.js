import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'


import Navbar from './component/navbar'
import Home from './component/home'
import Login from './component/login'
import Signup from './component/signup'
import Dashboard from './component/dashboard'
import ProjectEditor from './component/projectEditor'
import TaskEditor from './component/taskEditor'
import AddChat from './component/addChat'
import Messages from './component/messages'

import { setAuthToken } from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { setCurrentUser, logoutUser } from './redux/actions/authActions'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  let currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    console.log(decoded.exp);
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/project" component={ProjectEditor} />
          <Route exact path="/task" component={TaskEditor} />
          <Route exact path="/addchat" component={AddChat} />
          <Route exact path="/messages" component={Messages} />
        </Router>
      </Provider>
    )
  }
}
