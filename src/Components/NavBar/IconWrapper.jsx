import React from 'react'
import { useHistory } from 'react-router'
import NotificationBubble from '../../SharedComponents/NotificationBubble'
import ToolTip from "../../SharedComponents/ToolTip"

function IconWrapper({children,path,label,handleRefresh}) {
    const [hoverState,setHoverState] = React.useState(false)
    const history = useHistory()
    const {location} = history;
    const handlePath =()=>{
        history.push(path)
        handleRefresh()
        }    
    return (
        <div onClick={handlePath} className={location.pathname === path?"active" : "iconWrapper"} onMouseEnter={()=>setHoverState(true)} onMouseLeave={()=>setHoverState(false)}>
            {children}
            {hoverState && <ToolTip label={label} left="28%"/>}
        {location.pathname !== path && <NotificationBubble right="31%" top="-2px" number={0}/>}
        </div>
    )
}

export default IconWrapper
