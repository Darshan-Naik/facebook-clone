import {  GET_FAVORITE, GET_FRIENDS, GET_FRIEND_REQUEST, GET_NOTIFICATIONS, GET_SENT_REQUEST, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, USER_ACTIVE_STATUS } from "./actionTypes"


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
const getNotifications = (payload) => {
    return {
        type: GET_NOTIFICATIONS,
        payload
    }
}

const logoutSuccess = ()=>{
    return {
        type : LOG_OUT_SUCCESS
    }
}

const getFavorites = (payload) => {
    return {
        type: GET_FAVORITE,
        payload
    }
}

const updateUserActiveStatus = (payload) => {
    return {
        type: USER_ACTIVE_STATUS,
        payload
    }
}

export { loginFailure, loginSuccess, loginRequest, getFavorites, signUpFailure, signupRequest, signupSuccess, getFriendRequest, getFriends, getSentRequest, getNotifications, logoutSuccess, updateUserActiveStatus }