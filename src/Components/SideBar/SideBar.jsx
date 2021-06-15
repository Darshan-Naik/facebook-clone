import React from 'react';
import SideBarContent from "./SideBarContent";
import { Link } from "react-router-dom";
import { shallowEqual, useSelector } from 'react-redux';
import "../../Styles/SideBar/SideBar.css";
import "../../App.css";

function SideBar() {
    const { first_name, last_name, uid, profilePic } = useSelector(state => state.auth.user, shallowEqual);
    
    return (
        <div className="sideBarContainer">
            <div className="sideBarLinksContainer">
                <Link className="flexBox sideBarContentLink" to={`/profile/${uid}`}>
                    <SideBarContent src={profilePic} label={`${first_name} ${last_name}`} />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/friends/new">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/friends_icon.png'} label="Friends" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/market_place_icon.png'} label="Marketplace" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/messenger/new">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/messenger_icon.png'} label="Messenger" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/memories_icon.png'} label="Memories" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/videos">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/watch_icon.png'} label="Watch" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/favorites">
                    <SideBarContent src={process.env.PUBLIC_URL + '/Images/favorites_icon.png'} label="Favorites" />
                </Link>
            </div>
        </div>
    )
}

export default SideBar
