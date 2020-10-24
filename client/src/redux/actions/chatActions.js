import {GET_CHATS,UPDATE_FOR_CHAT,ADD_MESSAGE,GET_MESSAGE,GET_ERRORS} from './types'

import Axios from 'axios'


export const addChat = (parameters) => dispatch => {
    Axios.post('/api/chats/', parameters).then(res => {
        console.log(res)
        if (res.status !== 200) return
        dispatch({
            type: UPDATE_FOR_CHAT
        })
    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}

export const getChats = () => dispatch => {
    Axios.get(`/api/chats/`).then(res => {
        console.log(res)
        if (res.status !== 200) return
        dispatch({
            type: GET_CHATS,
            payload:res.data
        })
    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}

export const getMessages = (id) => dispatch => {
    Axios.get(`/api/messages/?chatId=${id}`).then(res => {
        console.log(res)
        if (res.status !== 200) return
        dispatch({
            type: GET_MESSAGE,
            payload:res.data
        })
    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}

// export const addMessage = (parameters) => dispatch => {
//     Axios.post(`/api/chats/`,parameters).then(res => {
//         console.log(res)
//         if (res.status !== 200) return
//         dispatch({
//             type: ADD_MESSAGE,
//             payload:res.data
//         })
//     }).catch(err => {
//         console.log(err.response)
//         dispatch({
//             type: GET_ERRORS,
//             payload: err.response
//         })
//     })
// }