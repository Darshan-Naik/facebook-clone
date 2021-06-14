import React from 'react'


function PopUp({className="",children,onClick,onMouseEnter=()=>{},onMouseLeave=()=>{}}) {

    const handleOnClick = (e)=>{
        e && e.stopPropagation();   
        onClick && onClick();
    }
    return (
        <div className={className} onClick={handleOnClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {children}
        </div>
    )
}

export default PopUp
