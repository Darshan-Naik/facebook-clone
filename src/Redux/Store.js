import { combineReducers, createStore } from "redux";
import { appReducer } from "./App/appReducer";
import { authReducer } from "./Auth/authReducer";
import { themeReducer } from "./Theme/appReducer";


const reducer = combineReducers({
    app :appReducer,
    theme : themeReducer,
    auth : authReducer
})
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;