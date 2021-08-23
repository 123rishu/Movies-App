import React, { useState, useContext, useEffect } from 'react';
import firebaseDB from "../../config/firebase";
import { IMAGE_URL, API_URL, API_KEY } from "../../API/secrets";
import "./Movie.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Movie = (props) => {
  const history = useHistory();
  let { poster_path, title, vote_average } = props.movieObject;
  let posterPath = IMAGE_URL + poster_path;

  const handleMovieClick = (e) => {
    history.push(`/moviepage/${props.movieObject.id}`);
  }

  return (
    <div className="movie-item">

      <div className="movie-poster">
          <img src={posterPath} onClick={handleMovieClick} alt="" />
      </div>

      <div className="movie-info">
        <div className="movie-title">{title}</div>
        <div className="movie-rating">{vote_average} IMDB</div>
      </div>

    </div>
  );
}

export default Movie;