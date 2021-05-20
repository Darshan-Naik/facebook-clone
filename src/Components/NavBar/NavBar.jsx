import React from 'react'
import "../../Styles/NavBar/NavBar.css"
import {ReactComponent as SearchIcon} from  "../../Icons/search.svg"
import {ReactComponent as MainLogo} from  "../../Icons/main-logo.svg"
import {ReactComponent as GameIcon} from  "../../Icons/game.svg"
import {ReactComponent as HomeIcon} from  "../../Icons/home.svg"
import {ReactComponent as UsersIcon} from  "../../Icons/users.svg"
import {ReactComponent as VideoIcon} from  "../../Icons/video.svg"
import {ReactComponent as CreateIcon} from  "../../Icons/create.svg"
import {ReactComponent as MessageIcon} from  "../../Icons/message.svg"
import {ReactComponent as NotificationIcon} from  "../../Icons/notification.svg"
import {ReactComponent as DownArrowIcon} from  "../../Icons/downArrow.svg"
import IconWrapper from './IconWrapper'
import IconWrapperCircle from './IconWrapperCircle'

function NavBar() {
    const[refresh,setRefresh] = React.useState(true)

    const handleRefresh=()=>{
        setRefresh(!refresh)
    }
    return (
        <div className="navBarContainer flexBox">

            <div className="navBarLogo flexBox">
                <MainLogo/>
                <div className="navBarSearchBox flexBox">
                <SearchIcon/>
                <input type="text" placeholder="Search Facebook" />
                </div>
            </div>

            <div className="navBarMainHeader flexBox">
                <IconWrapper path="/" label="Home" handleRefresh={handleRefresh} >
                     <HomeIcon />
                </IconWrapper>
                <IconWrapper path="/videos" label="Videos" handleRefresh={handleRefresh}>
                    <VideoIcon/>
                </IconWrapper>
                <IconWrapper path="/friends" label="Friends" handleRefresh={handleRefresh}>
                    <UsersIcon/>
                </IconWrapper>
                <IconWrapper path="/games" label="Games" handleRefresh={handleRefresh}>
                    <GameIcon/>
                </IconWrapper>
            </div>
            <div className="navBarUserBox flexBox">
                <IconWrapperCircle label="Create">
                    <CreateIcon />
                </IconWrapperCircle >
                <IconWrapperCircle label="Messenger">
                    <MessageIcon />
                </IconWrapperCircle>
                <IconWrapperCircle label="Notifications">
                    <NotificationIcon />
                </IconWrapperCircle>
                <IconWrapperCircle label="Account">
                    <DownArrowIcon />
                </IconWrapperCircle>
            </div>
            
        </div>
    )
}

export default NavBar
