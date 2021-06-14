import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from '../PostCard/PostCard'
import "../../Styles/Video/Video.css"
function Videos({handleRefresh}) {
    const posts = useSelector(store=>store.posts.posts)
    React.useEffect(handleRefresh,[])
    return posts.filter(post=>post.video).length?( 
        <div className="videoPostContainer scroll">
            {posts.filter(post=>post.video).map((post)=><PostCard key={post.id} {...post}/>)}

        </div>
    ):(
        <div className="pageNotFound flexBox">
            <img src={process.env.PUBLIC_URL + '/Images/sadFace.png'} alt="icon" />
            <h1>No videos available.</h1>

        </div>

    )
}

export default Videos
