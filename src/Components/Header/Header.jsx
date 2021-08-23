import React, { Component, useState, useContext } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";


const Header = (props) => {
  let [searchedMovie, setSearchedMovie] = useState("");
  let { currUser, logout } = useContext(AuthContext);
  let history = useHistory();

  const handleOnChange = (e) => {
    let value = e.target.value;
    setSearchedMovie(value);
  }

  const handleLogout = async () => {
    await logout();
    history.push("/login")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (currUser != null) {
        props.setMovies(searchedMovie);
      }
      setSearchedMovie("");
    }
  }
  return (
    <div className="header">

      <div className="logo">
        <img src="logo.svg" alt="" />
      </div>

      {
        currUser ? (
          <div className="search-btn">
            <Link to="/">
              <input
                type="text"
                placeholder="Search"
                className="search-movies"
                onChange={handleOnChange}
                onKeyPress={handleKeyPress}
                value={searchedMovie}
              />
            </Link>
          </div>
        )
          :
          (
            <></>
          )
      }


      <div className="header-links">
        <div className="header-link">
          <Link to="/">Home</Link>
        </div>

        <div className="header-link">
          <Link to={{ pathname: "/fav", state: { myLikedMovies: props.myLikedMovies } }}>Favourites</Link>
        </div>

        <div className="header-link">
          <button style={{
            textDecoration: 'none',
            color: "#DB202C",
            border: "none",
            background: "black"
          }} onClick={handleLogout}>Logout</button>
        </div>
      </div>

    </div >
  );
}

export default Header;