import React from 'react';
import "../../Styles/PostCard/PostCard.css";
import {ReactComponent as CommentIcon} from  "../../Icons/commentIcon.svg";
import {ReactComponent as ShareIcon} from  "../../Icons/shareIcon.svg";
import {ReactComponent as LikeIcon} from  "../../Icons/likeIcon.svg"
import {ReactComponent as LikeIconBlue} from  "../../Icons/like.svg";
import ShareModal from './ShareModal';
import useVisibility from '../../Hooks/useVisibility';


function PostCardFooter({showComment,handleLike,like,handleDeleteLike,handleShare,first_name,last_name,profilePic,author,title,video,image}) {
    const [shareModal,toggleShareModal]= useVisibility();
    
    return (
        <div className="postCardFooter flexBox">
            {like?(<div className="postCardFooterBox flexBox" onClick={handleDeleteLike}>
                    <div className="flexBox" >
                        <LikeIconBlue  />
                        <small >Like</small>
                    </div>
                
                </div>): 
                (<div className="postCardFooterBox flexBox" onClick={handleLike} >
                    <div className="flexBox" >
                        <LikeIcon />
                        <p >Like</p>
                    </div>
                
                </div>)
            }
            <div className="postCardFooterBox flexBox" onClick={showComment}>
                <CommentIcon  />
                <p>Comments</p>
            </div>
            <div className="postCardFooterBox flexBox" onClick={toggleShareModal} >
                <ShareIcon/>
                <p>Share</p>
            </div>
           
            {shareModal&&<ShareModal author={author} toggleShareModal={toggleShareModal} first_name={first_name} last_name={last_name} profilePic={profilePic} title={title} handleShare={handleShare} video={video} image={image} />}
            
        </div>
    )
}

export default PostCardFooter
