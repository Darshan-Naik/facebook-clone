import React from 'react'
import SideBar from "../../Components/SideBar/SideBar";
import Chats from '../Chats/Chats';

function Home() {
    return (
        <div>    
            <Chats />
            <SideBar />
        </div>
    )
}

export default Home
