import React, { useEffect, useState } from 'react';
import { database } from '../../../Firebase/firebase';

function BirthdayPerson(props){
    const [friendDetails, setfriendDetails] = useState([]);
    const [strDate, setStrDate] = useState([]);
    const [birthDate, setBirthDate] = useState(0);
    const [birthMonth, setBirthMonth] = useState("");
    //console.log(props)

    useEffect(()=>{
        const date = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        setStrDate(28 + ", " + months[1]);
    },[])

    // date.getDate()
    // date.getMonth()

    useEffect(()=>{
        database.collection('users').doc(props.friendId).get()
        .then(res => {
            console.log(res.data())
            setfriendDetails(res.data());
        });
    },[props.friendId])

    useEffect(()=>{
        const arr = friendDetails.dob?.split(", ")
        console.log(arr)
        setBirthDate(arr[0] + ", " + arr[1]);
    },[friendDetails])

    return (
        <>
            {birthDate===strDate?<p>{`${friendDetails.first_name} ${friendDetails.last_name}`}</p>:console.log(birthDate, strDate)}
        </>
    )
}

export default BirthdayPerson