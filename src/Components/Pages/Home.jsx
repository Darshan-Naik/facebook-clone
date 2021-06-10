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

function Home({handleRefresh}) {
    const uid = useSelector(store=>store.auth.user.uid)
    React.useEffect(()=>{
        database.collection("users").doc(uid).update({activeStatus : new Date()}) 
   },[uid])
    const posts = useSelector(store=>store.posts.posts)
    React.useEffect(handleRefresh,[])
    return (
        <div className="MainContainer">
            <div className="mainLeftSidebarContainer scroll">
                <SideBar />
            </div>         
          
            <div className="mainPostsContainer scroll">
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
                {posts.map((post)=><PostCard key={post.id} {...post}/>)}

            </div>
            <div className="mainRightSidebarContainer scroll">
                 <ActiveContactSideBar />
            </div>
            
        </div>
    )
}

export default Home
