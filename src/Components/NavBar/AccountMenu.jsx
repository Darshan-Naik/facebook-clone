import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { switchTheme } from '../../Redux/Theme/actions'

function AccountMenu() {

    const dispatch = useDispatch()
    const dark = useSelector(store=>store.theme.dark)
    const handleTheme =()=>{
        dispatch(switchTheme())
    }

    return (
        <div className="accountMenuContainer">
            <div className="darkModeBox flexBox">
                <p>Dark Mode</p>
                <div className="themeButton flexBox" onClick={handleTheme} style={{justifyContent:dark?"flex-end" : 'flex-start'}}>
                    <div className="themeButtonBubble" >

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountMenu
