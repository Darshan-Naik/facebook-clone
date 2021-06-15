import React from 'react'
import { database } from '../../Firebase/firebase';
import PostCard from '../PostCard/PostCard'

function FavoritesCard({postId,activePostId,setActivePostId}) {
    const [postDetails,setPostDetails] =React.useState(null);
    React.useEffect(()=>{
        database.collection("posts").doc(postId).get().then(res=>setPostDetails({...res.data(),id:res.id}));
        
    },[postId])
    
    return postDetails?(
        <>
            <PostCard activePostId={activePostId} setActivePostId={setActivePostId} {...postDetails}/>
            
        </>
    ):null
}

export default FavoritesCard
