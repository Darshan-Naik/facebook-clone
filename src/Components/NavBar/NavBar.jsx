import React from 'react'
import "../../Styles/NavBar/NavBar.css"
import {ReactComponent as SearchIcon} from  "../../Icons/search.svg"

function NavBar() {
    return (
        <div className="navBarContainer flexBox">
            <div className="navBarLogo">
                <img src={process.env.PUBLIC_URL + '/main-logo.png'} alt="Facebook" />
                <div className="navBarSearchBox">
                <SearchIcon/>
                fdskjgfgsdgfj
                </div>
            </div>
        </div>
    )
}

export default NavBar
