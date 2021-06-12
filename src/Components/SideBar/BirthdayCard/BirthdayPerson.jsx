import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { database } from '../../../Firebase/firebase';
import {ReactComponent as BirthdayIcon} from  "../../../Icons/birthdayIcon.svg";
import "../../../Styles/SideBar/SideBar.css";

const dummyData = {
    dob: "01, Jdm, 2039"
}/*dummy for first time*/

function BirthdayPerson(props){
    const [friendDetails, setfriendDetails] = useState(dummyData);
    const [strDate, setStrDate] = useState([]);
    const [birthDate, setBirthDate] = useState("");
    const history = useHistory();
    //console.log(props)

    useEffect(()=>{
        const date = new Date();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        setStrDate(date.getDate() + ", " + months[date.getMonth()]);
    },[])


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
        <div>
            {birthDate===strDate?<>
                <div className="birthdayCardContainer">
                    <div className="birthdayCardIcon flexBox">
                        <BirthdayIcon className="birthdayGiftIcon" />
                        <h3> Birthdays</h3>
                    </div>
                </div>
                <p className="birthdayWishMessage"><strong onClick={()=>history.push(`/profile/${friendDetails.uid}`)}>{`${friendDetails.first_name} ${friendDetails.last_name}'s`}</strong> birthday is today.</p>
                </>:null}
        </div>
    )
}

export default BirthdayPerson