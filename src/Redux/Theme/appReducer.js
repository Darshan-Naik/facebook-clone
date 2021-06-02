import { loadData, saveData } from "../../Utils/localStorage";
import { SWITCH_THEME } from "./actionTypes";

const init = loadData("theme") || {
    dark :false

}

export const themeReducer = (state=init,{type,payload})=>{

    switch (type) {
        
        case SWITCH_THEME : {
            const updatedTheme = {
                ...state,
                dark : !state.dark
            }
            saveData("theme",updatedTheme)
            return updatedTheme;
        }
        default : return state;
    }
}