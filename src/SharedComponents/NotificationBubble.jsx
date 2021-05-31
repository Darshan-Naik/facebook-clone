import React from 'react'

function NotificationBubble({width="18px",height="18px",color="#F02849",top=-5,right=-3,number}) {
    return number? (
        <div className="notificationBubble flexBox" style={{width ,height,backgroundColor:color, top,
            right}}>
               <p>{number}</p> 
        </div>
    ) : null
}

export default NotificationBubble
