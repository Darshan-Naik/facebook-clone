import React from 'react'
import { useSelector } from 'react-redux';
import FavoritesCard from './FavoritesCard'; 

function Favorites({handleRefresh}) {
    const favorites = useSelector(store=>store.auth.favorites)
    React.useEffect(handleRefresh,[]);
    return (
        <div className="videoPostContainer scroll">
            {favorites.map(el=><FavoritesCard key={el.postId} {...el}/>)}
            
        </div>
    )
}

export default Favorites
