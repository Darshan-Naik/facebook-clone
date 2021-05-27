import { ADD_ACTIVE_MESSAGE, REMOVE_ACTIVE_MESSAGE } from "./actionTypes";

const init = {
    activeMessages :[],
    activeContacts: [
        {
            first_name: "Bingo",
            last_name: "Tangles"
        },
        {
            first_name: "Darshan",
            last_name: "Boss"
        },
        {
            first_name: "Ankit",
            last_name: "Manager"
        },
        {
            first_name: "Soumyadri",
            last_name: "cool"
        }
    ]
}

export const appReducer = (state=init,{type,payload})=>{

    switch (type) {
        case ADD_ACTIVE_MESSAGE : {
            if( state.activeMessages.find( el => el.chatId === payload.chatId ) ) {
                return state;
            }
            if( state.activeMessages.length >= 3 ) {
                const data = [...state.activeMessages, payload];
                data.shift();
                return {
                    ...state,
                    activeMessages: data
                }
            }
            return {
                ...state,
                activeMessages : [...state.activeMessages, payload]
            }
        }
        case REMOVE_ACTIVE_MESSAGE : {
            return {
                ...state,
                activeMessages : state.filter(item=>item.id !== payload)
            }
        }
        default : return state;
    }


}