import React, { useEffect, useRef, useState } from 'react';
import SideBarContent from "./SideBarContent";
import {ReactComponent as SearchIcon} from  "../../Icons/search.svg";
import { ReactComponent as GreenTickIcon } from "../../Icons/greenTick.svg";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ContactBarDots } from "../../Icons/dots.svg";
import filterFriends from "../../Utils/filterFriends.js"
import { useHistory } from 'react-router-dom';
import ActiveContacts from './ActiveContacts';
import BirthdayCard from './BirthdayCard/BirthdayCard';
import ProfileProgressBox from '../ProfileProgressBox/ProfileProgressBox';
import useVisibility from '../../Hooks/useVisibility';
import PopUp from '../../SharedComponents/PopUp';
import { updateUserActiveStatus } from '../../Redux/Auth/actions';
import "../../Styles/SideBar/SideBar.css";

function ActiveContactSideBar ({ toggleNewChatBox }) {

    const [peopleSuggested, setPeopleSuggested] = useState([]);
    const [activeStatusBox, toggleActiveStatusBox] = useVisibility();
    const delayTimeRef = useRef();
    
    const { activeContacts, users} = useSelector( state => state.app, shallowEqual ); 
    const { friends, user, userActiveStatus } = useSelector( state => state.auth, shallowEqual );
    
    const dispatch = useDispatch();

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
            <ProfileProgressBox />
            {
                peopleSuggested.length > 0 && (
                    <div className="sideBarLinksContainer">
                        <div className="activeContactHeader flexBox">
                            <span className="contactHeaderTitle">People you may know</span>
                        </div>
                        {
                            peopleSuggested?.map( (el, i) => {
                                return el.uid !== user.uid && i < 3  && (
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
                                <div className="contactIconContainer" onClick={toggleNewChatBox}>
                                    <SearchIcon />
                                </div>
                                <div className="contactIconContainer" onClick={toggleActiveStatusBox}>
                                    <ContactBarDots />
                                </div>
                            </div>
                            {
                                activeStatusBox && (
                                    <React.Fragment>
                                        {
                                            userActiveStatus ? (
                                                <PopUp className="activeStatusPopUpCover flexBox" onClick={() => dispatch( updateUserActiveStatus() )}>
                                                    <div className="activeStatusPopUP userActive flexBox">
                                                        <GreenTickIcon />
                                                        <small>Turn Off Active Status</small>
                                                    </div>
                                                </PopUp>
                                            ) : (
                                                <PopUp className="activeStatusPopUpCover flexBox" onClick={() => dispatch( updateUserActiveStatus() )}>
                                                    <div className="activeStatusPopUP userNotActive flexBox">
                                                        <GreenTickIcon />
                                                        <small>Turn On Active Status</small>
                                                    </div>
                                                </PopUp>
                                            )
                                        }
                                    </React.Fragment>
                                )
                            }
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
