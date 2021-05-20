import React from 'react'
import NotificationBubble from '../../SharedComponents/NotificationBubble'
import ToolTip from "../../SharedComponents/ToolTip"
function IconWrapperCircle({children,label}) {
    const [hoverState,setHoverState] = React.useState(false) 

    return (
        <div className="iconWrapper-2 flexBox" onMouseEnter={()=>setHoverState(true)} onMouseLeave={()=>setHoverState(false)}>
                    {children}
                    {hoverState && <ToolTip label={label} />}
                    <NotificationBubble number={1}/>
        </div>
    )
}

export default IconWrapperCircle
