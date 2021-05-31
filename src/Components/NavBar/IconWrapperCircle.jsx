import React from 'react'
import NotificationBubble from '../../SharedComponents/NotificationBubble'
import ToolTip from "../../SharedComponents/ToolTip"
function IconWrapperCircle({children,label,icon}) {
    const [hoverState,setHoverState] = React.useState(false) 
    const [clickState,setClickState] = React.useState(false) 

    const handleMenu = (e)=>{
        setHoverState(false)
        setClickState(!clickState)
    }
    return (
        <div className="iconWrapper-2 flexBox" onMouseEnter={()=> !clickState && setHoverState(true)} onMouseLeave={()=>setHoverState(false)} onClick={handleMenu}>
                    {icon}
                    {clickState && children}
                    {hoverState && <ToolTip label={label} />}
                    <NotificationBubble number={1}/>
        </div>
    )
}

export default IconWrapperCircle
