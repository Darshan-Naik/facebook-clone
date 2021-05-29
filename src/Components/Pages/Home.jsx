import React from 'react'
import SideBar from "../../Components/SideBar/SideBar";
import PostCard from '../PostCard/PostCard';
import ActiveContactSideBar from "../SideBar/ActiveContactSideBar";

function Home() {
    return (
        <div className="flexBox">
           
            <SideBar />
            <PostCard/>
            <ActiveContactSideBar />
        </div>
    )
}

export default Home
