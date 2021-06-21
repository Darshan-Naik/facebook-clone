import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from '../PostCard/PostCard'
import "../../Styles/Video/Video.css"
import SideBar from "../SideBar/SideBar"
import { database } from '../../Firebase/firebase'
function Videos({handleRefresh}) {
    const [activePostId,setActivePostId]=React.useState(null);
    const [posts,setPosts] = React.useState([])
    React.useEffect(()=>{
        handleRefresh()
        const unsubscribe = database.collection("posts").where("video", "!=", "undefined").onSnapshot(res=>{
            setPosts(res.docs.map(doc=>({id:doc.id,...doc.data()}))) 
        });
        return ()=>{
            unsubscribe&& unsubscribe()
        }
    },[])
    return ( 
        
            <div className="videoMainContainer flexBox">
                <div className="mainLeftSidebarContainer">
                    <SideBar />
                </div>         
              
               { posts.filter(post=>post.video).length?(  <div className="videoPostContainer scroll">
                                        {posts.map((post)=><PostCard key={post.id} activePostId={activePostId} setActivePostId={setActivePostId} {...post}/>)}
    
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
