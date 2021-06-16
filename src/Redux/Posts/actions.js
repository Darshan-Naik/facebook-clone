import { CLEAR_POSTS, GET_NEXT_POSTS, GET_POSTS } from "./actionTypes"


const getPosts=(payload)=>{
    return {
        type : GET_POSTS,
        payload
    }
}
const getNextPosts=(payload)=>{
    return {
        type : GET_NEXT_POSTS,
        payload
    }
}
const clearPosts=()=>{
    return {
        type : CLEAR_POSTS,
    }
}

export {getPosts,clearPosts,getNextPosts}