import {
    GET_PROJECTS,
    ADD_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    PROJECT_LOADING,
    GET_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    SELECTED_TASK,
    SELECTED_PROJECT,
    UPDATE_FOR_PROJECT
} from '../actions/types'

const initialState = {
    projects: [],
    selectedProject: null,
    selectedTask: null,
    updateForProject:false,
    loading: false
}


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                updateForProject:false,
                loading: false
            }
        case UPDATE_FOR_PROJECT:
            return{
                ...state,
                updateForProject:true
            }
        case SELECTED_PROJECT:
            return {
                ...state,
                selectedProject: action.payload
            }
        case SELECTED_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }
        case PROJECT_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}