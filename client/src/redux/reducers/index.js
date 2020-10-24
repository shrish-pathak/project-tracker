import { combineReducers } from "redux";
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import projectReducer from './projectReducer'
import chatReducer from './chatReducer'

export default combineReducers({
    auth:authReducer,
    errors:errorReducer,
    projects:projectReducer,
    chats:chatReducer
})