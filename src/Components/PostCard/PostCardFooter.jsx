import React from 'react';
import "../../Styles/PostCard/PostCard.css";
import {ReactComponent as CommentIcon} from  "../../Icons/commentIcon.svg";
import {ReactComponent as LikeIcon} from  "../../Icons/likeIcon.svg"
import {ReactComponent as ShareIcon} from  "../../Icons/shareIcon.svg"


function PostCardFooter() {
    return (
        <div className="postCardFooter flexBox">
            <div className="flexBox" ><LikeIcon/><p>Like</p></div>
            <div className="flexBox"><CommentIcon/><p>Comments</p></div>
            <div className="flexBox"><ShareIcon/><p>Share</p></div>
            
        </div>
    )
}

export default PostCardFooter
