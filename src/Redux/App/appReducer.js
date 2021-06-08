
import { ADD_ACTIVE_MESSAGE, ADD_IN_ACTIVE_MESSAGE, ADD_IN_ACTIVE_MESSAGE_TO_ACTIVE_MESSAGE, CLOSE_ALL_MESSAGE, GET_CHAT_ROOMS, GET_USERS, MINIMIZE_ALL_MESSAGE, REMOVE_ACTIVE_MESSAGE, REMOVE_IN_ACTIVE_MESSAGE, RESET_APP, UPDATE_ACTIVE_CONTACTS } from "./actionTypes";

const init = {
    activeMessages :[],
    inActiveMessages :[],
    activeContacts: [],
    users :[],
    chatRooms : []
}

export const appReducer = (state=init,{type,payload})=>{

    switch (type) {
        case ADD_ACTIVE_MESSAGE : {
            if( state.activeMessages.find( el => el.chatID === payload.chatID ) ) {
                return state;
            }
            const updatedInActiveMessages = state.inActiveMessages.filter(el=>el.chatID !==payload.chatID)
            if( state.activeMessages.length >= 3 ) {
                let data = [...state.activeMessages];
               const message = data.shift();
                data = [payload,...data]
               
                if( state.inActiveMessages.find( el => el.chatID === message.chatID ) ) {
                    return  {
                        ...state,
                        activeMessages: data,
                        inActiveMessages : updatedInActiveMessages
                                               
                    }
                }
                return {
                    ...state,
                    activeMessages: data,
                    inActiveMessages : [...updatedInActiveMessages,message]
                }
            }
            return {
                ...state,
                activeMessages : [payload,...state.activeMessages ],
                inActiveMessages : [...updatedInActiveMessages]
            }
        }

        case REMOVE_ACTIVE_MESSAGE : {
            return {
                ...state,
                activeMessages : state.activeMessages.filter(item=>item.chatID !== payload)
            }
        }

        case ADD_IN_ACTIVE_MESSAGE :{
            const chat = state.activeMessages.filter(el=> el.chatID ===payload)
            const updateActiveMessage =  state.activeMessages.filter(el => el.chatID !==payload)

            return {
                ...state,
                activeMessages : updateActiveMessage,
                inActiveMessages : [...chat,...state.inActiveMessages]
            }
        }

        case REMOVE_IN_ACTIVE_MESSAGE : {
            return {
                ...state,
                inActiveMessages : state.inActiveMessages.filter(item=>item.chatID !== payload)
            }
        }

        case ADD_IN_ACTIVE_MESSAGE_TO_ACTIVE_MESSAGE :{
            const chat = state.inActiveMessages.filter(el=> el.chatID ===payload)
            const updateInActiveMessage =  state.inActiveMessages.filter(el => el.chatID !==payload)
            const updateActiveMessage = [...state.activeMessages]
            if(state.activeMessages.length >=3){
                let message = updateActiveMessage.shift();
                updateInActiveMessage.push(message)
            }
            return {
                ...state,
                activeMessages : [...chat,...updateActiveMessage],
                inActiveMessages : updateInActiveMessage
            }
        }

        case CLOSE_ALL_MESSAGE : {
            return {
                ...state,
                activeMessages : [],
                inActiveMessages : []
            }
        }
        case MINIMIZE_ALL_MESSAGE : {
            return {
                ...state,
                inActiveMessages : [...state.inActiveMessages,...state.activeMessages],
                activeMessages : []
            }
        }
        case GET_USERS :{
            return {
                ...state,
                users : payload
            }
        }
        case UPDATE_ACTIVE_CONTACTS :{
            return {
                ...state,
                activeContacts : payload
            }
        }
        case GET_CHAT_ROOMS :{
            return {
                ...state,
                chatRooms : payload
            }
        }
        case RESET_APP : {
            return {
                activeMessages :[],
                inActiveMessages :[],
                activeContacts: [],
                users :[],
                chatRooms : []
            }
        }
        default : return state;
    }


}