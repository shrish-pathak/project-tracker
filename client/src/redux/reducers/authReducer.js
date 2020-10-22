import { SET_CURRENT_USER, USER_LOADING,GET_USERS } from '../actions/types'
import isEmpty from '../../utils/isEmpty'

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: {},
    users:[]
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false
            }
        case GET_USERS:
            return{
                ...state,
                users:action.payload
            }
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}





