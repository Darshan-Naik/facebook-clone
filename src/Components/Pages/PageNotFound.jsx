import React from 'react';
import "../../Styles/PageNotFound/PageNotFound.css"

function PageNotFound() {
    return (
        <div className="pageNotFound flexBox ">
            <img src="https://www.facebook.com/images/comet/empty_states_icons/404/404_failed_loading_gray_wash.svg" alt="icon" />
            <h2>This Page Isn't Available</h2>
            <div>
                <p>The link may be broken, or the page may have been removed. Check to see if the link you're trying to open is correct.</p>
            </div>
            <h4>Go Back</h4>
            <h4>Visit Help Center</h4>
        </div>
    )
}

export default PageNotFound
