import React from 'react';
import {ReactComponent as LikeIconBlue} from  "../../Icons/like.svg";

function AfterLike({handleDeleteLike}) {
    return (
        <div onClick={handleDeleteLike} className="flexBox">
            <LikeIconBlue />
            <small >Like</small>
        </div>
    )
}

export default AfterLike
