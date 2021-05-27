import React from 'react'
import SideBarContent from "./SideBarContent";
import { Link } from "react-router-dom";
import {ReactComponent as SearchIcon} from  "../../Icons/search.svg"
import "../../Styles/SideBar/SideBar.css";

const ActiveContactSideBar = () => {
    return (
        <div className="sideBarContainer">
            <div className="sideBarLinksContainer activeContact">
                <div className="flexBox activeContactHeader">
                    <span className="contactHeaderTitle">Contacts</span>
                    <div className="flexBox contactHeaderContentContainer">
                        <div className="contactIconContainer">
                            <img className="videoCallIcon" src={process.env.PUBLIC_URL + "/Images/videoCall_icon.png"} alt=""/>
                        </div>
                        <div className="contactIconContainer">
                            <SearchIcon />
                        </div>
                    </div>
                </div>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent label="Darshan Naik" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent dotPosition="relative" label="Darshan Naik" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent dotPosition="relative" label="Darshan Naik" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent dotPosition="relative" label="Darshan Naik" />
                </Link>
                <Link className="flexBox sideBarContentLink" to="/">
                    <SideBarContent label="Darshan Naik" />
                </Link>
            </div>
        </div>
    )
}

export default ActiveContactSideBar
