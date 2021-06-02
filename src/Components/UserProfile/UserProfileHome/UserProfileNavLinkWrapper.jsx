import React from 'react'
import { useHistory, Link } from 'react-router-dom'

const UserProfileNavLinkWrapper = ({ path, children, extraClass }) => {
    const history = useHistory();
    const { location } = history
    console.log(location.pathname, path);
    return (
        <Link to={path} className={location.pathname === path ? `userProfileNavMenuName active ${extraClass}` : `userProfileNavMenuNameBox userProfileNavMenuName ${extraClass}`}>
            {children}
        </Link>
    )
}

export default UserProfileNavLinkWrapper
