import { SET_CURRENT_USER, USER_LOADING, GET_ERRORS, GET_USERS } from './types'
import Axios from 'axios'
import { setAuthToken } from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

export const getUsers = () => dispatch => {
    dispatch({
        type: USER_LOADING
    })

    Axios.get('/api/users/').then(res => {
        console.log(res)

        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}

export const loginUser = (parameters) => dispatch => {
    dispatch({
        type: USER_LOADING
    })

    Axios.post('/api/users/login', parameters).then(res => {
        console.log(res)

        const { token } = res.data

        localStorage.setItem("jwtToken", token)

        setAuthToken(token)

        const decoded = jwt_decode(token)

        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        })
    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}

export const registerUser = (parameters) => dispatch => {
    dispatch({ type: USER_LOADING })

    Axios.post('/api/users/register', parameters).then(res => {
        console.log(res)

        const { token } = res.data

        localStorage.setItem('jwtToken', token)

        setAuthToken(token)

        const decoded = jwt_decode(token)

        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        })

    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}

export const setCurrentUser = (decoded) => dispatch => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
    })
}

export const logoutUser = () => dispatch => {
    dispatch({ type: USER_LOADING })

    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    })

}