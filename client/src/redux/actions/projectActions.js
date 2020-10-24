import {
    GET_PROJECTS,
    ADD_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    GET_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    SELECTED_PROJECT,
    SELECTED_TASK,
    GET_ERRORS,
    UPDATE_FOR_PROJECT,
} from '../actions/types'

import Axios from 'axios'

export const getProjects = () => dispatch => {
    Axios.get('/api/projects/').then(res => {
        console.log(res)
        dispatch({
            type: GET_PROJECTS,
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

export const addProject = (parameters) => dispatch => {
    Axios.post('/api/projects/', parameters).then(res => {
        console.log(res)
        if (res.status !== 200) return
        dispatch({
            type: UPDATE_FOR_PROJECT
        })
    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}

export const editProject = (parameters) => dispatch => {
    Axios.put('/api/projects/', parameters).then(res => {
        console.log(res)
        if (res.status !== 200) return
        dispatch({
            type: UPDATE_FOR_PROJECT
        })
    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}

export const deleteProject = (parameters) => dispatch => {
    console.log(parameters)

    Axios.delete('/api/projects/', { params: parameters }).then(res => {
        console.log(res)
        if (res.status !== 200) return
        dispatch({
            type: UPDATE_FOR_PROJECT
        })
    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}

export const addTask = (parameters) => dispatch => {
    Axios.post('/api/tasks/', parameters).then(res => {
        console.log(res)
        if (res.status !== 200) return

        dispatch({
            type: UPDATE_FOR_PROJECT
        })
    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}



export const editTask = (parameters) => dispatch => {
    Axios.put('/api/tasks/', parameters).then(res => {
        console.log(res)
        if (res.status !== 200) return

        dispatch({
            type: UPDATE_FOR_PROJECT
        })
    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}

export const deleteTask = (parameters) => dispatch => {
    Axios.delete('/api/tasks/', { params: parameters }).then(res => {
        console.log(res)
        if (res.status !== 200) return

        dispatch({
            type: UPDATE_FOR_PROJECT
        })
    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    })
}

export const selectProject = (idx) => dispatch => {
    dispatch({
        type: SELECTED_PROJECT,
        payload: idx
    })
}

export const selectTask = (idx) => dispatch => {
    dispatch({
        type: SELECTED_TASK,
        payload: idx
    })
}

