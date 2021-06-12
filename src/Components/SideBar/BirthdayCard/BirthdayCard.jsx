import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BirthdayPerson from './BirthdayPerson';

function BirthdayCard(){
    const friends = useSelector(store=>store.auth.friends);
    //console.log(friends[1].friendId)

    return (
        <>
        {friends?.map((el)=><BirthdayPerson friendId={el.friendId} />)}
        </>
    )
}

export default BirthdayCard;