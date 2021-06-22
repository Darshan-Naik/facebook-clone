import { CLEAR_POSTS, GET_NEW_POSTS, GET_POSTS } from "./actionTypes"


const getPosts=(payload)=>{
    return {
        type : GET_POSTS,
        payload
    }
}
const getNewPosts=(payload)=>{
    return {
        type : GET_NEW_POSTS,
        payload
    }
}
const clearPosts=()=>{
    return {
        type : CLEAR_POSTS,
    }
}

export {getPosts,clearPosts,getNewPosts}