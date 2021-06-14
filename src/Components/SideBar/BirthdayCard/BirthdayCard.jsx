import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BirthdayPerson from './BirthdayPerson';
import { loadData } from '../../../Utils/localStorage';
import { saveData } from '../../../Utils/localStorage';

function BirthdayCard(){
    const [visibleBirthPopUp, setVisibleBirthPopUp] = useState(false);
    const friends = useSelector(store=>store.auth.friends);
    //console.log(friends)

    useEffect(()=>{
        const date = new Date();

        const data = loadData("birthPopUp");
        console.log(data)
        if(data==false){
            setVisibleBirthPopUp(true);
        } else if(data?.date!=date.getDate()){
            setVisibleBirthPopUp(true);
        } else {
            setVisibleBirthPopUp(false);
        }
    },[])

    const handleCloseBirthday = () => {
        const date = new Date();
        const data = {
            close: true,
            date: date.getDate()
        } 
        saveData("birthPopUp",data);
        setVisibleBirthPopUp(false)
    }

    return visibleBirthPopUp&&(
        <>
        {friends?.map((el)=><BirthdayPerson friendId={el.friendId} handleCloseBirthday={handleCloseBirthday} />)}
        </>
    )
}

export default BirthdayCard;