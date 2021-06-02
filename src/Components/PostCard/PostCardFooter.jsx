import React from 'react';
import "../../Styles/PostCard/PostCard.css";
import {ReactComponent as CommentIcon} from  "../../Icons/commentIcon.svg";
import {ReactComponent as LikeIcon} from  "../../Icons/likeIcon.svg"
import {ReactComponent as ShareIcon} from  "../../Icons/shareIcon.svg"
import {ReactComponent as LikeIconBlue} from  "../../Icons/like.svg";


function PostCardFooter({showComment,liked=false}) {
    return (
        <div className="postCardFooter flexBox">
            <div className="postCardFooterBox flexBox" >{liked?<LikeIconBlue/>:<LikeIcon/>}{liked?<small>Like</small>:<p>Like</p>}</div>
            <div className="postCardFooterBox flexBox" onClick={showComment}><CommentIcon  /><p>Comments</p></div>
            <div className="postCardFooterBox flexBox"><ShareIcon/><p>Share</p></div>
            
        </div>
    )
}

export default PostCardFooter
