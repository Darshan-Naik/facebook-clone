import React from 'react'

function ToolTip({label,left}) {
    return (
        <div className="toolTipBox" style={{left}}>
            {label}
        </div>
    )
}

export default ToolTip
