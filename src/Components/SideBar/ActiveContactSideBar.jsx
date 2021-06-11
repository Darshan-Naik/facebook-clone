import React, { useEffect, useRef, useState } from 'react'
import SideBarContent from "./SideBarContent";
import {ReactComponent as SearchIcon} from  "../../Icons/search.svg"
import "../../Styles/SideBar/SideBar.css";
import { useSelector } from 'react-redux';
import { ReactComponent as ContactBarDots } from "../../Icons/dots.svg";
import { ReactComponent as VideoCallIcon } from "../../Icons/videoCallIcon.svg";
import filterFriends from "../../Utils/filterFriends.js"
import { useHistory } from 'react-router-dom';
import ActiveContacts from './ActiveContacts';
import BirthdayCard from './BirthdayCard/BirthdayCard';

const ActiveContactSideBar = () => {

    const [peopleSuggested, setPeopleSuggested] = useState([]);
    
    const { activeContacts, users} = useSelector( state => state.app ); 
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

    return (
        <div className="sideBarContainer">
            <BirthdayCard />
            {
                peopleSuggested.length > 0 && (
                    <div className="sideBarLinksConatainer">
                        <div className="activeContactHeader flexBox">
                            <span className="contactHeaderTitle">People you may know</span>
                        </div>
                        {
                            peopleSuggested?.map( (el, i) => {
                                return el.uid !== user.uid && (
                                    <div key={el.uid} onClick={() => history.push(`/profile/${el.uid}`)} className="flexBox sideBarContentLink">
                                        <SideBarContent label={`${el.first_name} ${el.last_name}`} src={el.profilePic} />
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
            {
                activeContacts.length > 0 && (
                    <div className="sideBarLinksContainer activeContact">
                        <div className="flexBox activeContactHeader">
                            <span className="contactHeaderTitle">Contacts</span>
                            <div className="flexBox contactHeaderContentContainer">
                                <div className="contactIconContainer">
                                    <VideoCallIcon />
                                </div>
                                <div className="contactIconContainer">
                                    <SearchIcon />
                                </div>
                                <div className="contactIconContainer">
                                    <ContactBarDots />
                                </div>
                            </div>
                        </div>
                        <React.Fragment>
                            {
                                activeContacts.map( (user) => <ActiveContacts key={user.friendId} {...user}/>)
                            }
                        </React.Fragment>
                    </div>
                )
            }
        </div>
    )
}

export default ActiveContactSideBar
