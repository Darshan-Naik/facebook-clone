import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BirthdayPerson from './BirthdayPerson';

function BirthdayCard(){
    const friends = useSelector(store=>store.auth.friends);
    //console.log(friends)
    const user = useSelector(store=>store.auth.user)
    //console.log(user.accessibility)

    return user?.accessibility&&(
        <>
        {friends?.map((el)=><BirthdayPerson friendId={el.friendId} />)}
        </>
    )
}

export default BirthdayCard;