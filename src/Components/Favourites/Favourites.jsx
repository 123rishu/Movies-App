import React, { useState, useEffect, useContext } from 'react';
import {AuthContext} from "../../context/AuthProvider";
import { firebaseDB } from "../../config/firebase";
import Favourite from '../Favourite/Favourite';
import "./Favourites.css";

const Favourites = () => {
    let { currUser } = useContext(AuthContext);
    let [myLikedMovies, setLikedMovies] = useState([]);

    useEffect(async () => {
        //firebase se current live user ki liked movies ka array nikal rhe hai
        let uid = currUser.uid;
        let doc = await firebaseDB.collection("users").doc(uid).get();
        let userDataObject = doc.data();
        setLikedMovies(userDataObject.likedMovies);
    }, []);

    return (
        <div className="fav-list">
            {
                myLikedMovies.length == 0 ? (
                    <h1>No Movie Liked Yet</h1>
                ) : (
                    myLikedMovies.map(function (currMovieId) {
                        return <Favourite
                            key={currMovieId}
                            movieID={currMovieId}
                        ></Favourite>
                    })
                )

            }
        </div>
    );
}

export default Favourites;