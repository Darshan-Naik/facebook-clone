import React from 'react';
import LikeHover from './LikeHover';

function LikeToolTip({likes}) {
    return (
        <div className="likeToolTip">
            <p>Like</p>
            <div className="likeToolTipBox flexBox">
                {likes.map(el=><LikeHover {...el}/>)}
            </div>
             
            
        </div>
    )
}

export default LikeToolTip
