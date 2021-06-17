import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import filterFriends from '../../Utils/filterFriends';
import FriendsPageCard from "./FriendsPageCard";
import SideBarContent from "../SideBar/SideBarContent";
import SentFriendRequestModal from "./SentFriendRequestModal";
import useVisibility from '../../Hooks/useVisibility';
import FriendsCard from "./FriendsCard";

function FriendsPageSideBar({ forceRefresh }) {

    const [peopleSuggested, setPeopleSuggested] = useState([]);
    const [friendsVisibilityLimitation, setFriendsVisibilityLimitation] = useState(false);
    const [sentRequestVisibility, toggleSentRequestVisibility] = useVisibility();
    
    const friendRequests = useSelector( state => state.auth.friendRequests );
    const sentRequests = useSelector( state => state.auth.sentRequests );
    const users = useSelector( state => state.app.users );
    const { friends, user } = useSelector( state => state.auth, shallowEqual );
    
    const delayTimeRef = useRef();

    const history = useHistory();

    useEffect(() => {

        delayTimeRef.current = setTimeout(() => {
            setPeopleSuggested( filterFriends( users, friends, user ) )
        }, 2000)

        return () => {
            clearTimeout(delayTimeRef.current)
        }
    }, [ users, friends ,user]);

    useEffect(forceRefresh, []);

    return (
        <div className="friendsPageSideBarContainer">
            {
                friendRequests.length > 0 ? !friendsVisibilityLimitation ? (
                    <React.Fragment>
                        <h1 className="friendsSideBarHeading">Friends</h1>
                        <div className="flexBox friendsSideBarCount">
                            <h4>{`${friendRequests.length} ${ friendRequests.length > 1 ? `Friend Requests` : `Friend Request` }`}</h4>
                            <div className="seeAllFriends" onClick={() => setFriendsVisibilityLimitation(true)}>See All</div>
                        </div>
                        <div>
                            {
                                friendRequests.map( ( el, i ) => {
                                    return i < 4 && (
                                        <FriendsPageCard key={el.senderId} {...el}  />
                                    )
                                })
                            }
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <p className="seeAllFriendsBreadCrumbs flexBox">
                            <small onClick={() => setFriendsVisibilityLimitation(false)}>Friends</small> 
                            <span>
                                {`>`} 
                            </span>
                            <small>Friend Requests</small>
                        </p>
                        <h1 className="friendsSideBarHeading">Friend Requests</h1>
                        <div className="divider"></div>
                        <p className="allFriendsRequestsSideBarCount">{`${friendRequests.length} ${ friendRequests.length > 1 ? `Friend Requests` : `Friend Request` }`}</p>
                        <div className="seeAllSentRequestsTagBox">
                            <p className="seeAllSentRequestsTag" onClick={toggleSentRequestVisibility}>View Sent Requests</p>
                        </div>
                        <div className="seeAllFriendRequestContainer">
                            {
                                friendRequests.map( el => <FriendsPageCard key={el.senderId} {...el}  /> )
                            }
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <h1 className="friendsSideBarHeading">No Friend Requests</h1>
                        <div className="seeAllSentRequestsTagBox noFriendRequestsViewSentRequest">
                            <p className="seeAllSentRequestsTag" onClick={toggleSentRequestVisibility}>View Sent Requests</p>
                        </div>
                    </React.Fragment>
                )
            }
            {
                peopleSuggested.length > 0 && !friendsVisibilityLimitation && (
                    <React.Fragment>
                        <div className="divider"></div>
                        <div className="sideBarLinksContainer">
                            <div className="activeContactHeader flexBox">
                                <span className="peopleSuggestionTitle">People You May Know</span>
                            </div>
                            {
                                peopleSuggested?.map( (el, i) => {
                                    return el.uid !== user.uid && i < 5 && (
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
            {
                friends.length !== 0 && (
                    <React.Fragment>
                        <div className="divider"></div>
                        <div className="sideBarLinksContainer">
                            <div className="activeContactHeader flexBox">
                                <span className="peopleSuggestionTitle">Friends</span>
                            </div>
                            {
                                friends?.map( (el, i) => {
                                    return (
                                        <FriendsCard key={el.friendId} {...el} />
                                    )
                                })
                            }
                        </div>
                    </React.Fragment>
                )
            }
            {
                sentRequestVisibility && <SentFriendRequestModal sentRequests={sentRequests} toggleSentRequestVisibility={toggleSentRequestVisibility} />
            }
        </div>
    )
}

export default FriendsPageSideBar
