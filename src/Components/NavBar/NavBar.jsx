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
import {ReactComponent as MenuIcon} from  "../../Icons/menu.svg"
import {ReactComponent as BackIcon} from  "../../Icons/back.svg"
import IconWrapper from './IconWrapper'
import IconWrapperCircle from './IconWrapperCircle'
import { useHistory } from 'react-router'
import AccountMenu from './AccountMenu'

function NavBar() {
    const[refresh,setRefresh] = React.useState(true)
    const [searchBoxVisibility,setSearchBoxVisibility] = React.useState(false)
    const path = React.useRef(true)
    const history = useHistory()
    const handleRefresh=()=>{
        setRefresh(!refresh)
    }
    React.useEffect(handleRefresh,[history.location])
    const handleMenu=()=>{
        if(path.current){
            path.current = !path.current;
            history.push("/menu")
        } else {
            path.current = !path.current;
            history.goBack()
        }
       
    }
    return (
        <div className="navBarContainer flexBox">

            <div className="navBarLogo flexBox">
               {!searchBoxVisibility ? <MainLogo onClick={()=>history.push("/")}/> : (<div className="searchBarBackButton flexBox" onClick={()=>setSearchBoxVisibility(false)}>
                <BackIcon/> 
            </div>)}
                <div className="navBarSearchBox flexBox" style={{padding:searchBoxVisibility &&"4px 10px"}} >
               <div className="mainSearchIcon flexBox">
                    <SearchIcon />
                </div> 
                <div className="mainSearchIconResponse flexBox">
                    <SearchIcon onClick={()=>setSearchBoxVisibility(true)}/>
                </div>
            
                <input type="text" placeholder="Search Facebook" style={{display: searchBoxVisibility && "flex"}} className="navBarSearchBoxInput"/>
                </div>
              { !searchBoxVisibility && <div className="navBarMenu flexBox">
                    <MenuIcon onClick={handleMenu} />
                </div>}
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
               <IconWrapperCircle label="Create" icon={ <CreateIcon /> }>
                    
                </IconWrapperCircle >
                <IconWrapperCircle label="Messenger" icon={ <MessageIcon /> }>
                    
                </IconWrapperCircle>
                <IconWrapperCircle label="Notifications" icon={ <NotificationIcon /> }>
                    
                </IconWrapperCircle>
                <IconWrapperCircle label="Account" icon={ <DownArrowIcon/> }>
                    <AccountMenu />
                </IconWrapperCircle>
            </div>
            
        </div>
    )
}

export default NavBar
