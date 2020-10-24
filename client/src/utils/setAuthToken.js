import Axios from 'axios'

export const setAuthToken = token =>{
    if(token){
        Axios.defaults.headers.common['Authorization'] = token
    }else{
        delete Axios.defaults.headers.common['Authorization']
    }
}