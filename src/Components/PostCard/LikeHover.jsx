import React from 'react'
import { database } from '../../Firebase/firebase';

function LikeHover({author}) {
    const [userData,setUserData]=React.useState({})
    const {first_name,last_name}=userData;

    
    
    React.useEffect(() => {
        const unsubscribe = database.collection("users").doc(author)
        .onSnapshot((doc) => {
            setUserData(doc.data());
            
        });
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div>
            <>{`${first_name} ${last_name}`}</>
            
        </div>
    )
}

export default LikeHover
