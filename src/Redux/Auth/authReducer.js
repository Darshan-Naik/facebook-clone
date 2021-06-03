import { loadData, saveData } from "../../Utils/localStorage"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionTypes"


const init = loadData("user") || {
    isAuth : false,
    user : {},
    friends:[],
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
            default : return state
    }
}