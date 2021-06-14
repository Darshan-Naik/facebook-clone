import React from 'react'
import { database } from '../../Firebase/firebase';
import PostCard from '../PostCard/PostCard'

function FavoritesCard({postId,time}) {
    const [postDetails,setPostDetails] =React.useState(null);
    React.useEffect(()=>{
        database.collection("posts").doc(postId).get().then(res=>setPostDetails(res.data()));

    },[postId])
    
    return postDetails?(
        <>
            <PostCard {...postDetails}/>
            
        </>
    ):null
}

export default FavoritesCard
