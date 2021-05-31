import { SWITCH_THEME } from "./actionTypes";

const init = {
    dark :false

}

export const themeReducer = (state=init,{type,payload})=>{

    switch (type) {
        
        case SWITCH_THEME : {
            return {
                ...state,
                dark : !state.dark
            }
        }
        default : return state;
    }
}