import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {ReactComponent as BirthdayIcon} from  "../../../Icons/birthdayIcon.svg"

function BirthdayCard(){
    const friends = useSelector(store=>store.auth.friends);

    useEffect(()=>{
        const date = new Date();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const strDate = date.getDate() + ", " + months[date.getMonth()] + ", " + date.getFullYear();
        console.log(strDate)
    },[])
    return (
        <div className="birthdayCardContainer">
            <div className="birthdayCardIcon flexBox">
                <BirthdayIcon height={20} fill="blue" />
                <h3> Birthdays</h3>
            </div>
            <p className="birthdayRemiderPTag">Today <strong>Darshan Naik</strong> Birthday</p>
        </div>
    )
}

export default BirthdayCard;