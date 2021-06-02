import { GET_POSTS } from "./actionTypes"


const getPosts=(payload)=>{
    return {
        type : GET_POSTS,
        payload
    }
}

export {getPosts}