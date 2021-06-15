import React from 'react';
import StatusDot from "../../SharedComponents/StatusDot";
import "../../Styles/SideBar/SideBar.css";

function SideBarContent ({ src=`${process.env.PUBLIC_URL + '/Images/userProfile_icon.png'}`, label="Anonymous", active }) {

    return (
        <div className="sideBarContentContainer flexBox">
            <div className="sideBarContentUserImageBox">
                <img className="sideBarContentImage" src={src} alt={`${label} logo`}/>
                {active && <StatusDot bottom="5px" right="2px" />}
            </div>
            <div className="sideBarContentLabel">{label}</div>
        </div>
    )
}

export default SideBarContent