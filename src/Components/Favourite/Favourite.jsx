import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../context/AuthProvider";
import { API_KEY, API_URL, IMAGE_URL } from '../../API/secrets';
import { Link } from 'react-router-dom';
import "./Favourite.css";
import { useHistory } from "react-router-dom";

const Favourite = (props) => {
  let [detailedMovieObject, setDetailedMovieObject] = useState({});
  const history = useHistory();

  const handleMovieClick = (e) => {
    history.push(`/moviepage/${props.movieID}`);
  }

  useEffect(async () => {
    let data = await axios.get(`${API_URL}/movie/${props.movieID}?api_key=${API_KEY}`);
    let currDetailedMovieObj = data.data;
    let posterPath = IMAGE_URL + currDetailedMovieObj.poster_path;
    currDetailedMovieObj.poster_path = posterPath;
    setDetailedMovieObject(currDetailedMovieObj );
  }, []);

  return (
    <div className="movie-item">

      <div className="movie-poster" onClick={handleMovieClick}>
        <img src={detailedMovieObject.poster_path} alt="" />
      </div>

      <div className="movie-info">
        <div className="movie-title">{detailedMovieObject.title}</div>
        <div className="movie-rating">{detailedMovieObject.vote_average} IMDB</div>
      </div>

    </div>
  );
}

export default Favourite;