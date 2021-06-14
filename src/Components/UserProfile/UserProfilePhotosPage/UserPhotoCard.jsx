import React from 'react'

function UserPhotoCard ({image}) {
    return (
        <div className="photoCardImageCover">
            <div className="photoCardImage" style={{backgroundImage: `url("${image}")`}}></div>
        </div>
    )
}

export default UserPhotoCard
