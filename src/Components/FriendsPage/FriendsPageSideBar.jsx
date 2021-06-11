import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import filterFriends from '../../Utils/filterFriends';
import FriendsPageCard from "./FriendsPageCard";
import SideBarContent from "../SideBar/SideBarContent";

function FriendsPageSideBar({ forceRefresh }) {

    const friendRequests = useSelector( state => state.auth.friendRequests )

    const [peopleSuggested, setPeopleSuggested] = useState([]);
    
    const users = useSelector( state => state.app.users );
    const { friends, user } = useSelector( state => state.auth );
    const delayTimeRef = useRef();

    const history = useHistory();

    useEffect(() => {

        delayTimeRef.current = setTimeout(() => {
            setPeopleSuggested( filterFriends( users, friends, user ) )
        }, 2000)

        return () => {
            clearTimeout(delayTimeRef.current)
        }
    }, [ users, friends ,user])

    useEffect(forceRefresh, [])

    return (
        <div className="friendsPageSideBarContainer">
            {
                friendRequests.length > 0 ? (
                    <React.Fragment>
                        <h1 className="friendsSideBarHeading">Friends</h1>
                        <div>
                            {
                                friendRequests.map( el => <FriendsPageCard key={el.senderId} {...el}  /> )
                            }
                        </div>
                    </React.Fragment>
                ) : (
                    <h1 className="friendsSideBarHeading">No Friend Requests</h1>
                )
            }
            {
                peopleSuggested.length > 0 && (
                    <React.Fragment>
                        <div className="divider"></div>
                        <div className="sideBarLinksConatainer">
                            <div className="activeContactHeader flexBox">
                                <span className="peopleSuggestationTitle">People You May Know</span>
                            </div>
                            {
                                peopleSuggested?.map( (el, i) => {
                                    return el.uid !== user.uid && (
                                        <div key={el.uid} onClick={() => history.push(`/friends/${el.uid}`)} className="flexBox sideBarContentLink">
                                            <SideBarContent label={`${el.first_name} ${el.last_name}`} src={el.profilePic} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default FriendsPageSideBar
