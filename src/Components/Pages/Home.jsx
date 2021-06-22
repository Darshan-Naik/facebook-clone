import React from 'react'
import SideBar from "../../Components/SideBar/SideBar";
import PostCard from '../PostCard/PostCard';
import ActiveContactSideBar from "../SideBar/ActiveContactSideBar";
import "../../Styles/Home/Home.css"
import NewPost from '../NewPost/NewPost';
import StoryContainer from '../Story/StoryContainer';
import {  useSelector } from 'react-redux';
import { database } from '../../Firebase/firebase';
import PostCardSkeleton from '../PostCard/Skeleton/PostCardSkeleton';

function Home({handleRefresh, toggleNewChatBox,getNextPost,limit}) {
    const timer = React.useRef(true)
    const [activePostId,setActivePostId]=React.useState(null);
    const uid = useSelector(store=>store.auth.user.uid);
    const userActiveStatus = useSelector( store => store.auth.userActiveStatus );

    React.useEffect(()=>{
        userActiveStatus && database.collection("users").doc(uid).update({activeStatus : new Date()});
    },[uid])

    const posts = useSelector(store=>store.posts.posts)
    React.useEffect(handleRefresh,[])
    
    const handleGetNextPost =()=>{
       if((document.getElementById(posts[limit-1]?.id)?.getBoundingClientRect().bottom) <= (window.innerHeight+100) && timer.current) {
           timer.current = false;
           setTimeout(()=>{
            timer.current = true;
           },2000)
        getNextPost()
       }
    }
    return (
        <div className="MainContainer">
            <div className="mainLeftSidebarContainer scroll">
                <SideBar />
            </div>         
          
            <div className="mainPostsContainer scroll" onScroll={handleGetNextPost }>
                <StoryContainer />
                <NewPost />
                {!posts?.length && ( <>
                    <div className="postCardContainer" >
                        <PostCardSkeleton/>
                    </div>
                    <div className="postCardContainer" >
                        <PostCardSkeleton/>
                    </div>
                    <div className="postCardContainer" >
                        <PostCardSkeleton/>
                    </div>
                    <div className="postCardContainer" >
                        <PostCardSkeleton/>
                    </div>
                </>)
                }
                {posts.map((post,i)=>i<limit?<PostCard key={post.id+i} activePostId={activePostId} setActivePostId={setActivePostId} {...post}/>:null)}

            </div>
            <div className="mainRightSidebarContainer scroll">
                 <ActiveContactSideBar toggleNewChatBox={toggleNewChatBox} />
            </div>
            
        </div>
    )
}

export default Home
