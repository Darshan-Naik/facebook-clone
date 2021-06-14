import React from 'react'
import { useSelector } from 'react-redux';
import FavoritesCard from './FavoritesCard'; 

function Favorites() {
    const favorites = useSelector(store=>store.auth.favorites)
    return (
        <div >
            {favorites.map(el=><FavoritesCard key={el.postId} {...el}/>)}
            
        </div>
    )
}

export default Favorites
