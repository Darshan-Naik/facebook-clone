
import { ADD_ACTIVE_MESSAGE, REMOVE_ACTIVE_MESSAGE } from "./actionTypes";
const init = {
    activeMessages :[{},{}]
}

export const appReducer = (state=init,{type,payload})=>{

    switch (type) {
        case ADD_ACTIVE_MESSAGE : {
            return {
                ...state,
                activeMessages : [state.activeMessages,...payload]
            }
        }
        case REMOVE_ACTIVE_MESSAGE : {
            return {
                ...state,
                activeMessages : state.filter(item=>item.id !==payload)
            }
        }
        default : return state;
    }


}