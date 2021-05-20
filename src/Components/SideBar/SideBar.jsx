import React from 'react';
import { SideBarContent } from "./SideBarContent";
import { Link } from "react-router-dom";
import "./SideBar.css";
import "../../App.css";


function SideBar() {
    return (
        <div className="sideBarContainer">
            <div className="sideBarLinksContainer">
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" label="Darshan Naik" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/friends_icon.png'} label="Friends" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/marketPlace_icon.png'} label="Marketplace" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/messenger_icon.png'} label="Messenger" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/memories_icon.png'} label="Memories" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/watch_icon.png'} label="Watch" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/favourites_icon.png'} label="Favourites" />
                </Link>
            </div>
        </div>
    )
}

export default SideBar
