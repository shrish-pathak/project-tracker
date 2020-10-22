import {createStore, applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers/index'

const initialState = {}

let middleware = [thunk]

const composeFn = window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()):compose(applyMiddleware(...middleware))

const store = createStore(rootReducer,initialState,composeFn)

export default store

