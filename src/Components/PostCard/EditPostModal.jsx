import React from 'react';
import {ReactComponent as EmojiIcon} from  "../../Icons/emoji.svg";
import {ReactComponent as CloseIcon} from  "../../Icons/close.svg"
import {ReactComponent as FriendsIcon} from  "../../Icons/friends.svg"
import {ReactComponent as DownArrowIcon} from  "../../Icons/downArrow.svg";
import EmojiMart from "../../SharedComponents/EmojiMart";

function EditPostModal({profilePic,handleEditSection,handleEditModal,first_name,last_name,title,setEditModal,handleEditPost,editTitle,setEditTitle}) {

    const [emojiMartVisibility,setEmojiMartVisibility] = React.useState(false);

    const handleEditPostButton=()=>{
        handleEditPost(editTitle)
        handleEditSection();
        handleEditModal();

    }

    const handleEmoji=(emoji)=>{
        setEditTitle(title + emoji.native)
    }

    return (
        <div className="editPostModal">
            <div className="editedPostContainer">
                    <div className="editPostHeader flexBox">
                        <div className="editPostTitle">
                            <p>Edit Post</p>
                        </div>
                        <div className="editPostCloseButton flexBox"  onClick={()=>setEditModal(false)}>
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
                        <textarea value={editTitle} onChange={(e)=>setEditTitle(e.target.value)}  cols="30" rows={"5"} placeholder={`Whats on your mind, ${first_name || ""}?`}></textarea>
                            <div className="editPostEmojiMartContainer">
                                <EmojiIcon onClick={()=>setEmojiMartVisibility(!emojiMartVisibility)} />
                            {emojiMartVisibility && <div className="editPostEmojiMartBox">
                                    <EmojiMart handleEmoji={handleEmoji} />
                            </div>}
                               
                            </div> 
                        </div>   
                    </div>
                    <div className="editPostButton">
                        <button onClick={handleEditPostButton}>Edit Post</button>
                    </div>
            </div>

        </div>
    )
}

export default EditPostModal
