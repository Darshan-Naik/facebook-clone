import React from 'react'


function PopUp({className="",children,onClick}) {

    const handleOnClick = (e)=>{
        e && e.stopPropagation();
        onClick && onClick();
    }
    return (
        <div className={className} onClick={handleOnClick}>
            {children}
        </div>
    )
}

export default PopUp
