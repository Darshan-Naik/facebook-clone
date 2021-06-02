import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./actionTypes"


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

export { loginFailure,loginSuccess,loginRequest,signUpFailure,signupRequest,signupSuccess }