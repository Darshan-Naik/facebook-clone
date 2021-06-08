import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from '../PostCard/PostCard'
import "../../Styles/Video/Video.css"
function Videos({handleRefresh}) {
    const posts = useSelector(store=>store.posts.posts)
    React.useEffect(handleRefresh,[])
    return ( 
        <div className="videoPostContainer scroll">
            {posts.filter(post=>post.video).map((post)=><PostCard key={post.id} {...post}/>)}

        </div>
    )
}

export default Videos
