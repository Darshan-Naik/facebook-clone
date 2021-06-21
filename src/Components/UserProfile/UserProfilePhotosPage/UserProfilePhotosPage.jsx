import React, { useEffect, useState } from 'react';
import { database } from '../../../Firebase/firebase';
import "../../../Styles/UserProfile/UserProfilePhotosPage.css";
import UserPhotoCard from "./UserPhotoCard";

function UserProfilePhotosPage({ userProfileDetails, forceRefresh }) {

    const [userPhotos, setUserPhotos] = useState([]);

    useEffect(() => {
        const unsubscribe = database.collection('posts').where('author', '==', userProfileDetails.uid)
            .onSnapshot(res => {
                const newPhotos = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setUserPhotos(newPhotos);
            })

        return () => {
            unsubscribe();
        }
    }, [userProfileDetails]);

    useEffect(forceRefresh, []);

    return (
        <div className="userPhotosPageMainContainer">
            <h1 className="userPhotosPageHeaderTitle">Photos</h1>
            <div className="userPhotosBoxCover flexBox">
                {
                    userPhotos?.map(el => {
                        return el.image && (
                            <div key={el.id} className="userPhotoCardComponentCover">
                                <UserPhotoCard {...el} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserProfilePhotosPage
