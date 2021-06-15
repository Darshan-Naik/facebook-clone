import React from 'react';
import {ReactComponent as CommentIcon} from  "../../Icons/commentIcon.svg";
import {ReactComponent as ShareIcon} from  "../../Icons/shareIcon.svg";
import {ReactComponent as LikeIcon} from  "../../Icons/likeIcon.svg"
import {ReactComponent as LikeIconBlue} from  "../../Icons/like.svg";
import ShareModal from '../PostCard/ShareModal';
import useVisibility from '../../Hooks/useVisibility';


function PictureCardFooter({author,first_name,last_name,profilePic,title,handleShare, image,showComment,handleLike,like,handleDeleteLike}) {
    const [shareModal,toggleShareModal]= useVisibility();
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
            <div className="postDetailsCardFooterBox flexBox"  onClick={toggleShareModal}>
                <ShareIcon/>
                <p>Share</p>
            </div>
            {shareModal&&<ShareModal author={author} toggleShareModal={toggleShareModal} first_name={first_name} last_name={last_name} profilePic={profilePic} title={title} handleShare={handleShare} image={image} />}
            
        </div>
    )
}

export default PictureCardFooter
