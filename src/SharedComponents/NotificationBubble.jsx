import React from 'react'

function NotificationBubble({width="20px",height="20px",color="#F02849",top=-5,right=-3,number}) {
    return number? (
        <div className="notificationBubble" style={{width ,height,backgroundColor:color, top,
            right}}>
                {number}
        </div>
    ) : null
}

export default NotificationBubble
