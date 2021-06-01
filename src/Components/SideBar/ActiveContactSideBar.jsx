import React from 'react'
import SideBarContent from "./SideBarContent";
import {ReactComponent as SearchIcon} from  "../../Icons/search.svg"
import "../../Styles/SideBar/SideBar.css";
import { useDispatch, useSelector } from 'react-redux';
import { addActiveMessage } from '../../Redux/App/actions';
import { ReactComponent as ContactBarDots } from "../../Icons/dots.svg"
import { ReactComponent as VideoCallIcon } from "../../Icons/videoCallIcon.svg"

const ActiveContactSideBar = () => {
    const activeContacts = useSelector( state => state.app.activeContacts ); 
    const dispatch = useDispatch();
    const handleOpenChatBox = (id,userData) => {
        const payload = {
            chatId: id,
            userDetails: userData
        };

        dispatch( addActiveMessage( payload ) );
    };

    return (
        <div className="sideBarContainer">
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
        </div>
    )
}

export default ActiveContactSideBar
