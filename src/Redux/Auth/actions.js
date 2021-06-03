import { GET_FRIENDS, GET_FRIEND_REQUEST, GET_SENT_REQUEST, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionTypes"


const loginRequest = (payload)=>{
        return {
            type: LOGIN_REQUEST,
            payload
        }
}
const loginSuccess = (payload)=>{
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}
const loginFailure = (payload)=>{
    return {
        type: LOGIN_FAILURE,
        payload
    }
}
const signupRequest = (payload)=>{
    return {
        type: SIGNUP_REQUEST,
        payload
    }
}
const signUpFailure = (payload)=>{
    return {
        type: SIGNUP_FAILURE,
        payload
    }
}
const signupSuccess = (payload)=>{
    return {
        type: SIGNUP_SUCCESS,
        payload
    }
}
const getFriendRequest = (payload) => {
    return {
        type: GET_FRIEND_REQUEST,
        payload
    }
}
const getFriends = (payload) => {
    return {
        type: GET_FRIENDS,
        payload
    }
}
const getSentRequest = (payload) => {
    return {
        type: GET_SENT_REQUEST,
        payload
    }
}

export { loginFailure,loginSuccess,loginRequest,signUpFailure,signupRequest,signupSuccess, getFriendRequest, getFriends, getSentRequest }