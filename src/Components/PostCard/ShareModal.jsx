import React from 'react';
import {ReactComponent as EmojiIcon} from  "../../Icons/emoji.svg";
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import {ReactComponent as FriendsIcon} from  "../../Icons/friends.svg"
import {ReactComponent as DownArrowIcon} from  "../../Icons/downArrow.svg";
import EmojiMart from "../../SharedComponents/EmojiMart";
import { useSelector } from 'react-redux';

function ShareModal({image,video,title,setShareModal,handleShare}) {
    const [emojiMartVisibility,setEmojiMartVisibility] = React.useState(false);
    const [shareTitle,setShareTitle]=React.useState(title)
    const {profilePic,first_name,last_name} = useSelector(store=>store.auth.user)
    const handleSharePostButton=()=>{
        handleShare(shareTitle);
        setShareModal(false);
    }

    const handleEmoji=(emoji)=>{
        setShareTitle(shareTitle + emoji.native)
    }
    return (
        <div className="editPostModal">
            <div className="editedPostContainer">
                    <div className="editPostHeader flexBox">
                        <div className="editPostTitle flexBox">
                            <p>Share Post</p>
                        </div>
                        <div className="editPostCloseButton flexBox"  onClick={()=>setShareModal(false)}>
                             <CloseIcon/>
                        </div>
                    </div>
                    <div className="editPostUserImage flexBox">
                            <img  src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'}  alt="User" />
                        <div>
                            <p>{`${first_name || ""} ${last_name || ""}`} </p>
                            <div className="editPrivacySelect flexBox">
                                    <FriendsIcon />
                                    <p>Friends</p>
                                    <DownArrowIcon/>
                            </div>
                        </div>
                    </div>
                    <div className="editPostInput flexBox">
                       <div className="flexBox inputTextBox">
                        <textarea value={shareTitle} onChange={(e)=>setShareTitle(e.target.value)}  cols="30" rows={video||image?"1" : "5"} placeholder={`Whats on your mind, ${first_name || ""}?`}></textarea>
                            <div className="editPostEmojiMartContainer">
                                <EmojiIcon onClick={()=>setEmojiMartVisibility(!emojiMartVisibility)} />
                            {emojiMartVisibility && <div className="editPostEmojiMartBox">
                                    <EmojiMart handleEmoji={handleEmoji} />
                            </div>}
                               
                            </div> 
                        </div>   
                    </div>
                    {image&&<div  className="shareImage">
                        <img  src={image|| process.env.PUBLIC_URL + '/Images/facebook_login_logo.png'} alt="img" />
                    </div>}
                    {video&&<div className="shareImage">
                        <video width="100%" height="500" controls >
                            <source src={video} type="video/mp4"/>
                        </video>
                    </div>}
                    <div className="shareButton flexBox">
                        <button className="shareButton1"  onClick={handleSharePostButton}>Share Post</button>
                        <button className="shareCancelButton" onClick={()=>setShareModal(false)} >Cancel Share</button>
                    </div>
            </div>

        </div>
    )
}

export default ShareModal
