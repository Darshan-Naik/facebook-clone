import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from '../PostCard/PostCard'
import "../../Styles/Video/Video.css"
import SideBar from "../SideBar/SideBar"
function Videos({handleRefresh}) {
    const [activePostId,setActivePostId]=React.useState(null);
    const posts = useSelector(store=>store.posts.posts)
    React.useEffect(handleRefresh,[])
    return ( 
        
            <div className="videoMainContainer flexBox">
                <div className="mainLeftSidebarContainer">
                    <SideBar />
                </div>         
              
               { posts.filter(post=>post.video).length?(  <div className="videoPostContainer scroll">
                                        {posts.filter(post=>post.video).map((post)=><PostCard key={post.id} activePostId={activePostId} setActivePostId={setActivePostId} {...post}/>)}
    
                </div>) :(
        <div className="pageNotFound flexBox">
            <img src={process.env.PUBLIC_URL + '/Images/sadFace.png'} alt="icon" />
            <h1>No videos available.</h1>

        </div>

    )}
                
                
            </div>
        
    )
}

export default Videos
