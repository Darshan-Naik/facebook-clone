import React from 'react'

function StatusDot({width="10px",height="10px",color="rgb(49,162,76)",bottom=1,right=1}) {
    return (
        <div className="statusDot" style={{width ,height,backgroundColor:color, bottom, right}}></div>
    )
}

export default StatusDot
