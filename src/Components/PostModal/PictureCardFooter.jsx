import React from 'react';
import {ReactComponent as CommentIcon} from  "../../Icons/commentIcon.svg";
import {ReactComponent as ShareIcon} from  "../../Icons/shareIcon.svg";
import {ReactComponent as LikeIcon} from  "../../Icons/likeIcon.svg"
import {ReactComponent as LikeIconBlue} from  "../../Icons/like.svg";


function PictureCardFooter({showComment,handleLike,like,handleDeleteLike}) {
    return (
        <div className="postDetailsCardFooter flexBox">
            {like?(<div className="postDetailsCardFooterBox flexBox" onClick={handleDeleteLike}>
            <div className="flexBox" >
            <LikeIconBlue  />
            <small >Like</small>
            </div>
                
            </div>): 
            (<div className="postDetailsCardFooterBox flexBox" onClick={handleLike} >
            <div className="flexBox" >
            <LikeIcon />
            <p >Like</p>
            </div>
                
            </div>)
            }
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
