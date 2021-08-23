import React, { Component } from 'react';
import Movie from "../Movie/Movie";
import "./Movies.css";

const Movies = (props) => {
  let moviesData = props.movies;
  return (
    <div className="movies">
      {
        moviesData.map(function (currMovieObj) {
          return <Movie
            key={currMovieObj.id}
            movieObject={currMovieObj}
          ></Movie>
        })
      }
    </div>
  );
}

export default Movies;