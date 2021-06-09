import React from 'react';
import { useSelector } from 'react-redux';
import { database } from '../../Firebase/firebase';
import {ReactComponent as CameraIcon} from  "../../Icons/cameraIcon.svg";
import {ReactComponent as EmojiIcon} from  "../../Icons/happyFace.svg";
import CommentBox from '../PostCard/CommentBox';





function PictureCardComment({postId,comments}) {
    
    const [comment,setComment]=React.useState("")

    const {uid} = useSelector(store=>store.auth.user)
    const handleChange=(e)=>{
        const {value} = e.target;
        setComment(value)
        
        
    }
    const handleSubmit=(e)=>{
        if (e.key === 'Enter') {
            const payload={
                comment,
                time: new Date(),
                author:uid

            }
            database.collection("posts").doc(postId).collection("comments").add(payload)
            .then(res=>console.log(res))
            console.log(comment)
            setComment("")
          }
    }
 


    return (
        <div className="postDetailsCardCommentContainer">
            
            <div className="postDetailsModalCommentBox scroll">{comments?.map((el)=><CommentBox key={el.commentId}{...el} />)}</div>
            <div className="postDetailsCardInputBox flexBox">
                <img src={ process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="mypic" />
                <div className="addComment flexBox">
                    <div className="commentInput flexBox">
                        <input autoComplete ="off" autoFocus type="text" name="comment" id="comment" value={comment} onChange={handleChange} onKeyDown={handleSubmit} placeholder="Write a comment..."/>
                        <div className="flexBox">
                            <EmojiIcon/>
                            <CameraIcon/>
                        </div>
                    </div>
                    <small>Press Enter to post.</small>

                </div>
                
            </div>
            
            
        </div>
    )
}

export default PictureCardComment