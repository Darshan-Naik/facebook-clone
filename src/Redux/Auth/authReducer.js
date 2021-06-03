import { loadData, saveData } from "../../Utils/localStorage"
import { GET_FRIENDS, GET_FRIEND_REQUEST, GET_SENT_REQUEST, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionTypes"


const init = loadData("user") || {
    isAuth : false,
    user : {},
    friendRequests: [],
    friends:[],
    sentRequests: [],
    isError : false,
    isLoading :false,
    errorMessage : ""
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
            default : return state
    }
}