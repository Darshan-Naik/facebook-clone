import React from 'react'
import SideBar from "../../Components/SideBar/SideBar";
import Chats from '../Chats/Chats';
import ActiveContactSideBar from "../SideBar/ActiveContactSideBar";

function Home() {
    return (
        <div className="flexBox">
            <Chats />
            <SideBar />
            <ActiveContactSideBar />
        </div>
    )
}

export default Home
