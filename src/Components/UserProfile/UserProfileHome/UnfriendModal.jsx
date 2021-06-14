import React from 'react';
import { ReactComponent as CloseIcon } from "../../../Icons/close.svg";
import PopUp from "../../../SharedComponents/PopUp";

function UnfriendModal({ toggleUnfriendModalVisibility, first_name, handleUnfriend}) {
    return (
        <div className="seeAllSentRequestModalContainer" onClick={toggleUnfriendModalVisibility}>
            <PopUp className="seeAllSentRequestModalBox">
                <div className="flexBox seeAllSentRequestModalHeader">
                    <h1 className="unfriendModalNamePlate">Unfriend</h1>
                    <div className="flexBox seeAllSentRequestModalCloseIcon" onClick={toggleUnfriendModalVisibility}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="unfriendModalWarningTextBox">
                    <h1 className="unfriendModalWarningTextPlate">{`Are you sure you want to unfriend ${first_name}?`}</h1>
                </div>
                <div className="divider"></div>
                <div className="unfriendModalConfirmationButtonBox flexBox">
                    <button onClick={handleUnfriend}>Yes</button>
                    <button onClick={toggleUnfriendModalVisibility}>No</button>
                </div>
            </PopUp>
        </div>
    )
}

export default UnfriendModal
