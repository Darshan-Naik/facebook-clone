import { combineReducers, createStore } from "redux";
import { appReducer } from "./App/appReducer";


const reducer = combineReducers({
    app :appReducer
})
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;