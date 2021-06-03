import React from 'react'
import {ReactComponent as LikeIcon} from  "../../Icons/likeIcon.svg"


function Like({handleLike}) {
    return (
        <div className="flexBox" onClick={handleLike}>
            <LikeIcon />
            <p onClick={handleLike}>Like</p>
            
        </div>
    )
}

export default Like
