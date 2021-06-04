import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { database } from '../../Firebase/firebase';
import { addActiveMessage } from '../../Redux/App/actions';
import SideBarContent from './SideBarContent'

function ActiveContacts({friendId}) {
const [userDetails,setUserDetails] = React.useState({})
const users = useSelector(store=>store.app.users)
const uid = useSelector(store=>store.auth.user.uid)
const chatRooms = useSelector(store=>store.app.chatRooms) 
const dispatch = useDispatch()
React.useEffect(()=>{
    const user = users.filter((item)=>item.uid === friendId)
    setUserDetails(user[0])
},[users])

const handleChat =()=>{
            if(JSON.stringify(chatRooms).includes(friendId)){
                const chatRoom = chatRooms.filter((item)=>JSON.stringify(item).includes(friendId))
                dispatch(addActiveMessage(chatRoom[0]))
            } else {
                const payload = {
                    authors : [friendId,uid]
                }
                database.collection("chatRooms").add(payload).then((res)=>{
                    database.collection("chatRooms").doc(res.id).onSnapshot(res=>{
                        dispatch(addActiveMessage({chatID : res.id,...res.data()}))
                    })
                })
            }
}
    return (
        <div className="flexBox sideBarContentLink" onClick={handleChat}>
            <SideBarContent label={`${userDetails?.first_name} ${userDetails?.last_name}`} src={userDetails?.profilePic} />
        </div>
    )
}

export default ActiveContacts
