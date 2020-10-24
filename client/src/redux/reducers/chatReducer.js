import { GET_CHATS, GET_MESSAGE, UPDATE_FOR_CHAT } from '../actions/types'

const initialState = {
    chats: [],
    messages:[],
    updateForChat: false,
    updateForMessages:false,
    loading: false
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case GET_CHATS:
            return {
                ...state,
                chats: action.payload,
                updateForChat: false,
                loading: false
            }
        case UPDATE_FOR_CHAT:
            return {
                ...state,
                updateForChat: true,
                loading: true
            }
        case GET_MESSAGE:{
            return {
                ...state,
                messages:action.payload,
                loading:false
            }
        }
        default:
            return state
    }
}