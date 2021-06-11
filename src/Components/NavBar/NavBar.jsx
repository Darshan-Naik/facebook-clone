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
import { useSelector } from 'react-redux'
import NewPostModal from '../NewPost/NewPostModal'
import Notifications from './Notifications'

function NavBar({refresh,handleRefresh}) {
    const [postModalVisibility,setPostModalVisibility] = React.useState(false)
    const [notificationVisibility,setNotificationVisibility] = React.useState(false)
    const [accountVisibility,setAccountVisibility] = React.useState(false)
    const [searchBoxVisibility,setSearchBoxVisibility] = React.useState(false)
    const path = React.useRef(true)
    const history = useHistory()
    const {profilePic,first_name,uid} = useSelector(store=>store.auth.user)
    const notifications = useSelector(store=>store.auth.notifications)
    const handleMenu=()=>{
        if(path.current){
            path.current = !path.current;
            history.push("/menu")
        } else {
            path.current = !path.current;
            history.goBack()
        }
       
    }
    const handleNotificationVisibility =(e)=>{
        e.stopPropagation()
       setNotificationVisibility(!notificationVisibility)
       setAccountVisibility(false)
    }
    const handleAccountVisibility =(e)=>{
        e.stopPropagation()
        setNotificationVisibility(false)
        setAccountVisibility(!accountVisibility)
     }
     window.addEventListener("click",()=>{
         setAccountVisibility(false)
         setNotificationVisibility(false)
     })
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
                <div className="userProfileCard flexBox" onClick={()=>{history.push(`/profile/${uid}`)}}>
                    <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="Profile" />
                    <p>{first_name}</p>

                </div>
               <IconWrapperCircle label="Create" icon={ <CreateIcon  onClick={()=>setPostModalVisibility(true)}/> } >
                    
                </IconWrapperCircle >
                <IconWrapperCircle path="/messenger/new" label="Messenger" icon={ <MessageIcon /> } number={0}>
                    
                </IconWrapperCircle>
                <IconWrapperCircle childVisibility={notificationVisibility} label="Notifications" icon={ <NotificationIcon onClick={handleNotificationVisibility} /> } number={notifications.filter(item=>!item.isRead)?.length}>
                  {notificationVisibility &&  <Notifications notifications={notifications} uid={uid} />}
                </IconWrapperCircle>
                <IconWrapperCircle childVisibility={accountVisibility} label="Account" icon={ <DownArrowIcon onClick={handleAccountVisibility}/> }>
                 {accountVisibility &&   <AccountMenu />}
                </IconWrapperCircle>
               
            </div>
        { postModalVisibility &&   <NewPostModal setPostModalVisibility={setPostModalVisibility} />}
        </div>
    )
}

export default NavBar
