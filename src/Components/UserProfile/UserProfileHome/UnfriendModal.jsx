import React from 'react';
import { ReactComponent as CloseIcon } from "../../../Icons/close.svg";

function UnfriendModal({ handleUnfriendModalVisibility, first_name, handleUnfriend}) {
    return (
        <div className="seeAllSentRequestModalContainer">
            <div className="seeAllSentRequestModalBox" onClick={(e) => e.stopPropagation()}>
                <div className="flexBox seeAllSentRequestModalHeader">
                    <h1 className="unfriendModalNamePlate">Unfriend</h1>
                    <div className="flexBox seeAllSentRequestModalCloseIcon" onClick={handleUnfriendModalVisibility}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="unfriendModalWarningTextBox">
                    <h1 className="unfriendModalWarningTextPlate">{`Are you sure you want to unfriend ${first_name}?`}</h1>
                </div>
                <div className="divider"></div>
                <div className="unfriendModalConfirmationButtonBox flexBox">
                    <button onClick={handleUnfriend}>Yes</button>
                    <button onClick={handleUnfriendModalVisibility}>No</button>
                </div>
            </div>
        </div>
    )
}

export default UnfriendModal
