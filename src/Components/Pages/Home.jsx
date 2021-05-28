import React from 'react'
import SideBar from "../../Components/SideBar/SideBar";
import ActiveContactSideBar from "../SideBar/ActiveContactSideBar";

function Home() {
    return (
        <div className="flexBox">
           
            <SideBar />
            <ActiveContactSideBar />
        </div>
    )
}

export default Home
