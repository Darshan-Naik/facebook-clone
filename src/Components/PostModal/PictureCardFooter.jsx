import React from 'react';
import {ReactComponent as CommentIcon} from  "../../Icons/commentIcon.svg";
import {ReactComponent as ShareIcon} from  "../../Icons/shareIcon.svg";
import AfterLike from '../PostCard/AfterLike';
import Like from '../PostCard/Like';


function PictureCardFooter({showComment,handleLike,like,handleDeleteLike}) {
    return (
        <div className="postDetailsCardFooter flexBox">
            <div className="postDetailsCardFooterBox flexBox" >
                {like?<AfterLike handleDeleteLike={handleDeleteLike}/>:<Like handleLike={handleLike}/>}
            </div>
            <div className="postDetailsCardFooterBox flexBox" onClick={showComment}>
                <CommentIcon  />
                <p>Comments</p>
            </div>
            <div className="postDetailsCardFooterBox flexBox">
                <ShareIcon/>
                <p>Share</p>
            </div>
            
        </div>
    )
}

export default PictureCardFooter
