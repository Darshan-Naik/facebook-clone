import React from 'react'
import "../../Styles/PostCard/PostCard.css"
import {ReactComponent as DotsIcon} from  "../../Icons/dots.svg"

function PostCardHead({img,clientName,time}) {
    return (
        <div className="postCardHeadContainer flexBox">
            <div className="postCardHeadBox1">
                <img src={img||"data:image/jpeg;base64,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"} alt="pic" />
            </div>
            <div className="postCardHeadBox2">
                <h4>{clientName||"NAME"}</h4>
                <small>{time||"Yesterday at 9:50 AM"}</small>
            </div>
            <div className="postCardHeadBox3"><DotsIcon/></div>
            
        </div>
    )
}

export default PostCardHead
