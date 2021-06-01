import React from 'react'
import { useHistory } from 'react-router'
import NotificationBubble from '../../SharedComponents/NotificationBubble'
import ToolTip from "../../SharedComponents/ToolTip"
function IconWrapperCircle({children,label,icon,path}) {
    const [hoverState,setHoverState] = React.useState(false) 
    const [clickState,setClickState] = React.useState(false) 
    const history = useHistory()
    const handleMenu = (e)=>{
        setHoverState(false)
        setClickState(!clickState)
         path &&  history.push(path)
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
