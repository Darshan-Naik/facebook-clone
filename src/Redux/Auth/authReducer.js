import { loadData, saveData } from "../../Utils/localStorage"
import {  GET_FAVORITE, GET_FRIENDS, GET_FRIEND_REQUEST, GET_NOTIFICATIONS, GET_SENT_REQUEST, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, USER_ACTIVE_STATUS } from "./actionTypes"


const init = loadData("user") || {
    isAuth : false,
    user : {},
    friendRequests: [],
    friends:[],
    sentRequests: [],
    notifications : [],
    favorites : [],
    isError : false,
    isLoading :false,
    errorMessage : "",
    userActiveStatus: true
}

 export const authReducer = (state=init,{type,payload})=>{
    switch(type) {
            case LOGIN_REQUEST : {
                return {
                    ...state,
                    isLoading : true
                }
            } 
            case LOGIN_FAILURE : {
                return {
                    ...state,
                    isLoading : false,
                    isError :true,
                    errorMessage : payload
                }
            } case LOGIN_SUCCESS : {
                const updatedSate = {
                    ...state,
                    isLoading : false,
                    isError :false,
                    isAuth:true,
                    errorMessage : "",
                    user : payload
                }
                saveData("user",updatedSate)
                return updatedSate;
            } 
            case SIGNUP_REQUEST : {
                return {
                    ...state,
                    isLoading : true
                }
            } 
            case SIGNUP_FAILURE : {
                return {
                    ...state,
                    isLoading : false,
                    isError :true,
                    errorMessage : payload
                }
            } case SIGNUP_SUCCESS : {

                const updatedSate = {
                    ...state,
                    isLoading : false,
                    isError :false,
                    isAuth:true,
                    errorMessage : "",
                    user : payload
                }
                saveData("user",updatedSate)
                return updatedSate
            } 
            case GET_FRIEND_REQUEST: {
                const updatedState = {
                    ...state,
                    friendRequests: payload
                }
                saveData("user", updatedState);
                return updatedState;
            }
            case GET_FRIENDS: {
                const updatedState = {
                    ...state,
                    friends: payload
                }
                saveData("user", updatedState);
                return updatedState;
            }
            case GET_SENT_REQUEST: {
                const updatedState = {
                    ...state,
                    sentRequests: payload
                }
                saveData("user", updatedState);
                return updatedState;
            }
            case GET_NOTIFICATIONS: {
                const updatedState = {
                    ...state,
                    notifications: payload
                }
                saveData("user", updatedState);
                return updatedState;
            }
            case GET_FAVORITE: {
                const updatedState = {
                    ...state,
                    favorites: payload
                }
                saveData("user", updatedState);
                return updatedState;
            }

            case LOG_OUT_SUCCESS : {
                const initState = {
                    isAuth : false,
                    user : {},
                    friendRequests: [],
                    friends:[],
                    sentRequests: [],
                    favorites : [],
                    notifications : [],
                    isError : false,
                    isLoading :false,
                    errorMessage : "",
                    userActiveStatus: true
                }
                saveData("user", initState);
                return initState
            }

            case USER_ACTIVE_STATUS: {
                return {
                    ...state,
                    userActiveStatus: !state.userActiveStatus
                }
            }
            default : return state
    }
}