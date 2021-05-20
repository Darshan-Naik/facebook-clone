import React from 'react'
import SideBar from "../../Components/SideBar/SideBar";
import PostCard from '../PostCard/PostCard';


function Home() {
    return (
        <div className="flexBox">    
            <SideBar />
            <PostCard/>
        </div>
    )
}

export default Home
