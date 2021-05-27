import { ADD_ACTIVE_MESSAGE, REMOVE_ACTIVE_MESSAGE } from "./actionTypes"

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

export { addActiveMessage,removeActiveMessage}