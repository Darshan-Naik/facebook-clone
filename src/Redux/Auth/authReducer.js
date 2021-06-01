import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionTypes"


const init ={
    isAuth : false,
    user : {},
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
                return {
                    ...state,
                    isLoading : false,
                    isError :false,
                    isAuth:true,
                    errorMessage : "",
                    user : payload
                }
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
                return {
                    ...state,
                    isLoading : false,
                    isError :false,
                    isAuth:true,
                    errorMessage : "",
                    user : payload
                }
            } 
            default : return state
    }
}