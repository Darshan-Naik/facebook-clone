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
                    <SideBarContent src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" label="Friends" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" label="Messenger" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" label="Photos" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" label="Posts" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" label="Favourites" />
                </Link>
            </div>
        </div>
    )
}

export default SideBar
