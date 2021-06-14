import React from 'react';
import "../../Styles/PostCard/PostCard.css";
import {ReactComponent as CommentIcon} from  "../../Icons/commentIcon.svg";
import {ReactComponent as ShareIcon} from  "../../Icons/shareIcon.svg";
import AfterLike from './AfterLike';
import Like from './Like';
import ShareModal from './ShareModal';


function PostCardFooter({showComment,handleLike,like,handleDeleteLike,handleShare,first_name,last_name,profilePic,author,title,image}) {
    const [shareModal,setShareModal]=React.useState(false);
    
    return (
        <div className="postCardFooter flexBox">
            <div className="postCardFooterBox flexBox" >
                {like?<AfterLike handleDeleteLike={handleDeleteLike}/>:<Like handleLike={handleLike}/>}
            </div>
            <div className="postCardFooterBox flexBox" onClick={showComment}>
                <CommentIcon  />
                <p>Comments</p>
            </div>
            <div className="postCardFooterBox flexBox" onClick={()=>setShareModal(!shareModal)} >
                <ShareIcon/>
                <p>Share</p>
            </div>
           
            {shareModal&&<ShareModal author={author} setShareModal={setShareModal} first_name={first_name} last_name={last_name} profilePic={profilePic} title={title} handleShare={handleShare} image={image} />}
            
        </div>
    )
}

export default PostCardFooter
