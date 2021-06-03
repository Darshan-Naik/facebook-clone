import React, { useEffect, useState } from 'react'
import SideBarContent from "./SideBarContent";
import {ReactComponent as SearchIcon} from  "../../Icons/search.svg"
import "../../Styles/SideBar/SideBar.css";
import { useDispatch, useSelector } from 'react-redux';
import { addActiveMessage } from '../../Redux/App/actions';
import { ReactComponent as ContactBarDots } from "../../Icons/dots.svg"
import { ReactComponent as VideoCallIcon } from "../../Icons/videoCallIcon.svg"

const ActiveContactSideBar = () => {

    const [peopleSuggested, setPeopleSuggested] = useState([]);
    console.log(peopleSuggested);

    const { activeContacts, totalUsers} = useSelector( state => state.app ); 
    const { userFriends } = useSelector( state => state.auth );

    const dispatch = useDispatch();
    const handleOpenChatBox = (id,userData) => {
        const payload = {
            chatId: id,
            userDetails: userData
        };

        dispatch( addActiveMessage( payload ) );
    };

    useEffect(() => {

        // let output = [{
        //     first_name: "abdul"
        // }];
        // let suggestedPeople = [];

        // for( let i=0; i<totalUsers; i++ ) {
        //     for( let j=0; j<userFriends; j++ ) {
        //         if( totalUsers[i].uid !== userFriends[i].uid ) {
        //             output.push(totalUsers[i])
        //         }
        //     }
        // }

        // for( let i=0; i<5; i++ ) {
        //     if( output[ Math.floor( Math.random() * output.length ) ] !== undefined ) {
        //         suggestedPeople.push( output[ Math.floor( Math.random() * output.length ) ] )
        //     }
        // }

        // setPeopleSuggested( suggestedPeople )
    }, [])

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
                                return (
                                    <div key={i} onClick={() => handleOpenChatBox(i, el)} className="flexBox sideBarContentLink">
                                        <SideBarContent />
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
