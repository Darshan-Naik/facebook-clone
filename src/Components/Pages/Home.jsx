import React from 'react'
import SideBar from "../../Components/SideBar/SideBar";
import PostCard from '../PostCard/PostCard';
import ActiveContactSideBar from "../SideBar/ActiveContactSideBar";
import "../../Styles/Home/Home.css"
import NewPost from '../NewPost/NewPost';
import StoryContainer from '../Story/StoryContainer';

import {  useSelector } from 'react-redux';

function Home() {

    const posts = useSelector(store=>store.posts.posts)

    return (
        <div className="MainContainer">
            <div className="mainLeftSidebarContainer scroll">
                <SideBar />
            </div>         
          
            <div className="mainPostsContainer scroll">
                <StoryContainer />
                <NewPost />
                {posts.map((post)=><PostCard key={post.id} {...post}/>)}

            </div>
            <div className="mainRightSidebarContainer scroll">
                 <ActiveContactSideBar />
            </div>
            
        </div>
    )
}

export default Home
