import { combineReducers, createStore } from "redux";
import { appReducer } from "./App/appReducer";
import { authReducer } from "./Auth/authReducer";
import { postsReducer } from "./Posts/postsReducer";
import { themeReducer } from "./Theme/appReducer";


const reducer = combineReducers({
    app :appReducer,
    theme : themeReducer,
    auth : authReducer,
    posts : postsReducer
})
const store = createStore(reducer)

export default store;