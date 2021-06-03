import React, { useEffect, useState } from 'react'
import SideBarContent from "./SideBarContent";
import {ReactComponent as SearchIcon} from  "../../Icons/search.svg"
import "../../Styles/SideBar/SideBar.css";
import { useDispatch, useSelector } from 'react-redux';
import { addActiveMessage } from '../../Redux/App/actions';
import { ReactComponent as ContactBarDots } from "../../Icons/dots.svg";
import { ReactComponent as VideoCallIcon } from "../../Icons/videoCallIcon.svg";
import filterFriends from "../../Utils/filterFriends.js"
import { useHistory } from 'react-router-dom';

const ActiveContactSideBar = () => {

    const [peopleSuggested, setPeopleSuggested] = useState([]);
    console.log(peopleSuggested);
    const { activeContacts, users} = useSelector( state => state.app ); 
    const { friends, user } = useSelector( state => state.auth );
    
    const history = useHistory();

    const dispatch = useDispatch();
    const handleOpenChatBox = (id,userData) => {
        const payload = {
            chatId: id,
            userDetails: userData
        };
        
        dispatch( addActiveMessage( payload ) );
    };
    
    useEffect(() => {
        setPeopleSuggested( filterFriends( users, friends ) )
    }, [users])

    return (
        <div className="sideBarContainer">
            {
                peopleSuggested.length > 0 && (
                    <div className="sideBarLinksConatainer">
                        <div className="activeContactHeader flexBox">
                            <span className="contactHeaderTitle">People you may know</span>
                        </div>
                        {
                            peopleSuggested?.map( (el, i) => {
                                return el.uid !== user.uid && (
                                    <div key={i} onClick={() => history.push(`/profile/${el.uid}`)} className="flexBox sideBarContentLink">
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
                                activeContacts.map( (el, i) => {
                                    return (
                                        <div key={i} onClick={() => handleOpenChatBox(i, el)} className="flexBox sideBarContentLink">
                                            <SideBarContent active label={`${el.first_name} ${el.last_name}`} src={el.profilePic} />
                                        </div>
                                    )
                                })
                            }
                        </React.Fragment>
                    </div>
                )
            }
        </div>
    )
}

export default ActiveContactSideBar
