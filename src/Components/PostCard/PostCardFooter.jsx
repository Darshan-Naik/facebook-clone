import React from 'react';
import "../../Styles/PostCard/PostCard.css";
import {ReactComponent as CommentIcon} from  "../../Icons/commentIcon.svg";
import {ReactComponent as LikeIcon} from  "../../Icons/likeIcon.svg"
import {ReactComponent as ShareIcon} from  "../../Icons/shareIcon.svg"


function PostCardFooter({showComment}) {
    return (
        <div className="postCardFooter flexBox">
            <div className="postCardFooterBox flexBox" ><LikeIcon/><p>Like</p></div>
            <div className="postCardFooterBox flexBox" onClick={showComment}><CommentIcon  /><p>Comments</p></div>
            <div className="postCardFooterBox flexBox"><ShareIcon/><p>Share</p></div>
            
        </div>
    )
}

export default PostCardFooter
