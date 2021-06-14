import React from 'react'

function useVisibility() {

    const [state,setState] = React.useState(false)
    const handleToggle = (e)=>{
        e &&  e.stopPropagation();
        setState(state=>!state);
    }

    const handleOpen = (e)=>{
        e &&  e.stopPropagation();  
        setState(true);
    }

    const handleClose = (e)=>{
        e &&  e.stopPropagation();
        setState(false);
    }

    return [state,handleToggle,handleOpen,handleClose]
}

export default useVisibility
