import React from 'react';
import {ReactComponent as CameraIcon} from  "../../Icons/cameraIcon.svg";
import {ReactComponent as EmojiIcon} from  "../../Icons/happyFace.svg";

const initState=[
    {
        img:"",
        othersName:"xyz",
        othersComments:"good"
    },
    {
        img:"",
        othersName:"xyz",
        othersComments:"good"
    }
]



function PostCardComment({img,othersName,othersComments}) {
    const [addComments,setAddComments]=React.useState(initState);
    const [comment,setComment]=React.useState("")
    const handleChange=(e)=>{
        const {value} =e.target;
        setComment(value)
        
        
    }
    const handleSubmit=(e)=>{
        if (e.key === 'Enter') {
            const payload={
                img:"",
                othersName:"JON",
                othersComments:comment

            }
            setAddComments([...addComments,payload]);
            setComment("")
          }
    }


    return (
        <div className="postCardCommentContainer flexBox">
            <p>View more comments</p>
            {addComments?.map((el)=>
            <div className="postCardInputBox flexBox">
                <img src={el.img|| process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="otherspic" />
                <div className="addComment flexBox">
                    <div className="addCommentBox flexBox">
                        <strong>{el.othersName||"friend"}</strong>
                        <small>{el.othersComments||"Nice Clicksfdf"}</small>
                    </div>
                    <div className="postCardCommentLikeandReply flexBox">
                        <small>Like  </small>
                        <samp>·</samp>
                        <small>Reply </small>

                    </div>
                    
                    
                </div>

            </div>)}
            <div className="postCardInputBox flexBox">
                <img src={img|| process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="mypic" />
                <div className="addComment flexBox">
                    <div className="commentInput flexBox">
                        <input autoFocus type="text" name="comment" id="comment" value={comment} onChange={handleChange} onKeyDown={handleSubmit} placeholder="Write a comment..."/>
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

export default PostCardComment
