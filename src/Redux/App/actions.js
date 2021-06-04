import { ADD_ACTIVE_MESSAGE, ADD_IN_ACTIVE_MESSAGE, ADD_IN_ACTIVE_MESSAGE_TO_ACTIVE_MESSAGE, CLOSE_ALL_MESSAGE, GET_CHAT_ROOMS, GET_USERS, MINIMIZE_ALL_MESSAGE, REMOVE_ACTIVE_MESSAGE, REMOVE_IN_ACTIVE_MESSAGE, UPDATE_ACTIVE_CONTACTS } from "./actionTypes"

const  addActiveMessage =(payload)=>{
    return {
        type: ADD_ACTIVE_MESSAGE,
        payload
    }
}
const  removeActiveMessage =(payload)=>{
    return {
        type: REMOVE_ACTIVE_MESSAGE,
        payload
    }
}
const  addInActiveMessage =(payload)=>{
    return {
        type: ADD_IN_ACTIVE_MESSAGE,
        payload
    }
}
const  removeInActiveMessage =(payload)=>{
    return {
        type: REMOVE_IN_ACTIVE_MESSAGE,
        payload
    }
}
const  addInActiveMessageToActiveMessage =(payload)=>{
    return {
        type: ADD_IN_ACTIVE_MESSAGE_TO_ACTIVE_MESSAGE,
        payload
    }
}
const minimizeAllMessage = ()=>{
    return {
        type: MINIMIZE_ALL_MESSAGE
    }
}
const closeAllMessage = ()=>{
    return {
        type: CLOSE_ALL_MESSAGE
    }
}
const getUsers = (payload)=>{
    return {
        type: GET_USERS,
        payload
    }
}   
const updateActiveContacts = (payload)=>{
    return {
        type: UPDATE_ACTIVE_CONTACTS,
        payload
    }
} 
const getChatRooms = (payload) => {
    return {
        type: GET_CHAT_ROOMS,
        payload
    }
}
export {getUsers,closeAllMessage,minimizeAllMessage, addActiveMessage,removeActiveMessage,addInActiveMessage,removeInActiveMessage,addInActiveMessageToActiveMessage,updateActiveContacts,getChatRooms}