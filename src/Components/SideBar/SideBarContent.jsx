import React from 'react'

export const SideBarContent = ({src, label}) => {
    return (
        <div className="sideBarContentContainer flexBox">
            <img className="sideBarContentImage" src={src} alt={`${label} logo`}/>
            <div className="sideBarContentLabel">{label}</div>
        </div>
    )
}
