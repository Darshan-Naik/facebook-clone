import React from 'react'
import { useSelector } from 'react-redux'
import SearchResultCard from './SearchResultCard'
import PopUp from '../../SharedComponents/PopUp'
function SearchResult({query,closeSearchResultBox}) {
    const users = useSelector(store=>store.app.users)
    const result = users.filter(user=>`${user.first_name} ${user.last_name}`.toLowerCase().includes(query.toLowerCase()));
    return (
        <PopUp className="searchResultContainer flexBox scroll" >
            {!result.length?(<div className="emptyResult">
                    <p>No users found</p>
            </div>) : null}
            {result.map(user=><SearchResultCard key={user.uid} closeSearchResultBox={closeSearchResultBox} {...user}/>)}
        </PopUp>
    )
}

export default SearchResult
