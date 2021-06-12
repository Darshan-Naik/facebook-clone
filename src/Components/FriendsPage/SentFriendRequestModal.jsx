import React, { useState } from 'react';
import { ReactComponent as CloseIcon } from "../../Icons/close.svg";
import SenderFriendCard from "./SenderFriendCard";

function SentFriendRequestModal({ sentRequests, handleSentRequestVisibility }) {

    return (
        <div className="seeAllSentRequestModalContainer">
            <div className="seeAllSentRequestModalBox" onClick={(e) => e.stopPropagation()}>
                <div className="flexBox seeAllSentRequestModalHeader">
                    <h1 className="seeAllSentRequestModalHeaderNamePlate">Sent Requests</h1>
                    <div className="flexBox seeAllSentRequestModalCloseIcon" onClick={handleSentRequestVisibility}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="allSentRequestMainContainer scroll">
                    <div className="allSentRequestModalCount">{`${sentRequests.length} ${ sentRequests.length > 1 ? `Sent Requests` : `Sent Request` }`}</div>
                    <div>
                        {
                            sentRequests?.map( el => <SenderFriendCard key={el.receiverId} {...el} /> )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SentFriendRequestModal
