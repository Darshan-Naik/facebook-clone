import React from 'react';
import "../../Styles/PostCard/PostCard.css";
import {ReactComponent as CommentIcon} from  "../../Icons/commentIcon.svg";
import {ReactComponent as ShareIcon} from  "../../Icons/shareIcon.svg";
import AfterLike from './AfterLike';
import Like from './Like';


function PostCardFooter({showComment,handleLike,like,handleDeleteLike}) {
    return (
        <div className="postCardFooter flexBox">
            <div className="postCardFooterBox flexBox" >
                {like?<AfterLike handleDeleteLike={handleDeleteLike}/>:<Like handleLike={handleLike}/>}
            </div>
            <div className="postCardFooterBox flexBox" onClick={showComment}>
                <CommentIcon  />
                <p>Comments</p>
            </div>
            <div className="postCardFooterBox flexBox">
                <ShareIcon/>
                <p>Share</p>
            </div>
            
        </div>
    )
}

export default PostCardFooter
