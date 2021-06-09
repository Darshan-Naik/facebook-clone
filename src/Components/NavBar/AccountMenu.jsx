import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { switchTheme } from '../../Redux/Theme/actions'
import {ReactComponent as DarkModeIcon} from  "../../Icons/darkMode.svg"
import {ReactComponent as LogoutIcon} from  "../../Icons/logout.svg"
import { useHistory } from 'react-router'
import { logoutSuccess } from '../../Redux/Auth/actions'
import { resetApp } from '../../Redux/App/actions'
import { clearPosts } from '../../Redux/Posts/actions'
function AccountMenu() {
    const {profilePic,first_name,last_name, uid} = useSelector(store=>store.auth.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const dark = useSelector(store=>store.theme.dark)
    const handleTheme =()=>{
        dispatch(switchTheme())
    }
    const handleLogout=()=>{
        dispatch(clearPosts())
        dispatch(resetApp())
        dispatch(logoutSuccess())
    }
    return (
        <div className="accountMenuContainer">
             <div className="AccountMenuUserProfileCard flexBox" onClick={()=>{history.push(`/profile/${uid}`)}}>
                    <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="Profile" />
                   <div>
                   <p>{`${first_name} ${last_name}`}</p>
                   <small>See your profile</small>
                    </div> 
            </div>
            <hr />
            <div className="darkModeBox flexBox">
                <DarkModeIcon onClick={handleTheme}/>
                <p>Dark Mode</p>
                <div className="themeButton flexBox" onClick={handleTheme} style={{justifyContent:dark?"flex-end" : 'flex-start'}}>
                    <div className="themeButtonBubble" >

                    </div>
                </div>
            </div>
            <div className="logOutBox flexBox" onClick={handleLogout}>
                <div className="logoutIconWrap flexBox">
                    <LogoutIcon/>
                </div>
               
                <p>Log Out</p>
            </div>
        </div>
    )
}

export default AccountMenu
