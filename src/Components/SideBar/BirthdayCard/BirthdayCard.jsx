import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {ReactComponent as BirthdayIcon} from  "../../../Icons/birthdayIcon.svg";
import { database } from '../../../Firebase/firebase';
import BirthdayPerson from './BirthdayPerson';

function BirthdayCard(){
    const friends = useSelector(store=>store.auth.friends);
    //console.log(friends[1].friendId)

    return (
        <div className="birthdayCardContainer">
            <div className="birthdayCardIcon flexBox">
                <BirthdayIcon height={20} fill="blue" />
                <h3> Birthdays</h3>
            </div>
            {friends.map((el)=><BirthdayPerson friendId={el.friendId} />)}
        </div>
    )
}

export default BirthdayCard;