import React from 'react';
import SideBarContent from "./SideBarContent";
import { Link } from "react-router-dom";
import "../../Styles/SideBar/SideBar.css";
import "../../App.css";
import { useSelector } from 'react-redux';


function SideBar() {
    const { first_name, last_name, uid, profilePic } = useSelector(state => state.auth.user);
    console.log(profilePic);
    return (
        <div className="sideBarContainer">
            <div className="sideBarLinksContainer">
                <Link className="flexBox sideBarContentLink" to={`/profile/${uid}`}>
                    <SideBarContent src={profilePic} label={`${first_name} ${last_name}`} />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/friends/profile">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/friends_icon.png'} label="Friends" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/market_place_icon.png'} label="Marketplace" />
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
