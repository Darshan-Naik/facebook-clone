import { contacts } from "../../Utils/localData";
import { ADD_ACTIVE_MESSAGE, ADD_IN_ACTIVE_MESSAGE, ADD_IN_ACTIVE_MESSAGE_TO_ACTIVE_MESSAGE, CLOSE_ALL_MESSAGE, GET_USERS, MINIMIZE_ALL_MESSAGE, REMOVE_ACTIVE_MESSAGE, REMOVE_IN_ACTIVE_MESSAGE } from "./actionTypes";

const init = {
    activeMessages :[],
    inActiveMessages :[],
    activeContacts: [...contacts],
    users :[]
}

export const appReducer = (state=init,{type,payload})=>{

    switch (type) {
        case ADD_ACTIVE_MESSAGE : {
            if( state.activeMessages.find( el => el.chatId === payload.chatId ) ) {
                return state;
            }
            const updatedInActiveMessages = state.inActiveMessages.filter(el=>el.chatId !==payload.chatId)
            if( state.activeMessages.length >= 3 ) {
                let data = [...state.activeMessages];
               const message = data.shift();
                data = [payload,...data]
               
                if( state.inActiveMessages.find( el => el.chatId === message.chatId ) ) {
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
                activeMessages : state.activeMessages.filter(item=>item.chatId !== payload)
            }
        }

        case ADD_IN_ACTIVE_MESSAGE :{
            const chat = state.activeMessages.filter(el=> el.chatId ===payload)
            const updateActiveMessage =  state.activeMessages.filter(el => el.chatId !==payload)

            return {
                ...state,
                activeMessages : updateActiveMessage,
                inActiveMessages : [...chat,...state.inActiveMessages]
            }
        }

        case REMOVE_IN_ACTIVE_MESSAGE : {
            return {
                ...state,
                inActiveMessages : state.inActiveMessages.filter(item=>item.chatId !== payload)
            }
        }

        case ADD_IN_ACTIVE_MESSAGE_TO_ACTIVE_MESSAGE :{
            const chat = state.inActiveMessages.filter(el=> el.chatId ===payload)
            const updateInActiveMessage =  state.inActiveMessages.filter(el => el.chatId !==payload)
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
        default : return state;
    }


}