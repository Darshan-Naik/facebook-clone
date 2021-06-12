import React from 'react'
import checkActive from '../Utils/checkActive'
import { SkeletonTheme }  from 'react-loading-skeleton'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
function UserDetailsCard({profilePic,first_name,last_name,activeStatus}) {
    const dark = useSelector(store=>store.theme.dark)
    return first_name? (
        <div className="userDetailsCard">
            <img src={profilePic || process.env.PUBLIC_URL + '/Images/userProfile_icon.png'} alt="Pic" />
            <p>{`${first_name} ${last_name}`}</p>
            <small>{checkActive(activeStatus)}</small>
        </div>
    ) :  (<SkeletonTheme width={200} color={dark?"#202020" :"#dadada" } highlightColor={dark?"#444":"#f3efef"} > 
            <div className="flexBox" style={{flexDirection:"column"}}>
                <Skeleton style={{margin:"0 5px"}} circle={true} height={50} width={50} />
                <Skeleton style={{borderRadius:"25px"}} width={130} height={15}/>
                <Skeleton style={{borderRadius:"25px"}} width={100} height={10}/>
            </div>
    </SkeletonTheme>)
}

export default UserDetailsCard
