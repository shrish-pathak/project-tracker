import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
            <h1>hellooooooo</h1>
        </div>
      </Provider>
    )
  }
}
