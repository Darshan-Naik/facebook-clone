import React from 'react'
import SideBar from "../../Components/SideBar/SideBar";
import PostCard from '../PostCard/PostCard';
import ActiveContactSideBar from "../SideBar/ActiveContactSideBar";
import "../../Styles/Home/Home.css"
function Home() {
    return (
        <div className="MainContainer">
            <div className="mainLeftSidebarContainer scroll">
                <SideBar />
            </div>         
          
            <div className="mainPostsContainer scroll">
            <PostCard/>
            <PostCard/>
            <PostCard/>
            <PostCard/>
            </div>
            <div className="mainRightSidebarContainer scroll">
                 <ActiveContactSideBar />
            </div>
            
        </div>
    )
}

export default Home
