import React, { useContext, useState, useEffect } from 'react';
import Header from "./Components/Header/Header.jsx";
import Movies from "./Components/Movies/Movies.jsx";
import Pagination from "./Components/Pagination/Pagination.jsx";
import axios from "axios";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Favourites from "./Components/Favourites/Favourites.jsx";
import MoviePage from "./Components/MoviePage/MoviePage.jsx";
import { API_KEY, API_URL, IMAGE_URL } from "./API/secrets.js";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  let [moviesData, setMoviesData] = useState([]);
  let [currentMovie, setCurrentMovie] = useState("avengers");
  let [pages, setPages] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [myLikedMovies, setMyLikedMovies] = useState([]);
  let { currUser } = useContext(AuthContext);

  const setMovies = async (newMovieName) => {
    // https://api.themoviedb.org/3/search/movie?api_key=22c80894f6d873434847bec78664b84b&query=Avenger&page=1
    let dataFromSearch = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: newMovieName },
    });
    let totalNoOfPages = dataFromSearch.data.total_pages;
    let pages = [];
    for (let i = 1; i <= totalNoOfPages; i++) {
      pages.push(i);
    }
    let moviesData = dataFromSearch.data.results.slice(0, 10);
    if (currUser != null) {
      setMoviesData(moviesData);
      setCurrentMovie(newMovieName);
      setPages(pages);
    }
  }

  const previousPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: currentPage - 1, query: currentMovie },
    });
    let moviesData = data.data.results.slice(0, 10);
    setMoviesData(moviesData);
    setCurrentPage(currentPage - 1);
  }

  const nextPage = async () => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: currentPage + 1, query: currentMovie },
    });
    let moviesData = data.data.results.slice(0, 10);
    setMoviesData(moviesData);
    setCurrentPage(currentPage + 1);
  }

  const setPage = async (currentPageCount) => {
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: currentPageCount, query: currentMovie },
    });
    let moviesData = data.data.results.slice(0, 10);
    setMoviesData(moviesData);
    setCurrentPage(currentPageCount);
  }

  useEffect(async () => {
    //API CALL
    //params -> key, page, query
    //https://api.themoviedb.org/3/search/movie?api_key=22c80894f6d873434847bec78664b84b&query=Avenger&page=1
    let data = await axios.get(API_URL + "/search/movie", {
      params: { api_key: API_KEY, page: 1, query: currentMovie }
    });

    let moviesData = data.data.results.slice(0, 10);
    let pagesCount = data.data.total_pages; //3
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    setMoviesData(moviesData);
    setPages(pages);
  }, [])

  return (
    <Router>
      <div className="App">
        <Header setMovies={setMovies} myLikedMovies={myLikedMovies}></Header>
        <Switch>
          {currUser ? (
            <>
              <Route path="/" exact>
                {moviesData.length ? (
                  <React.Fragment>
                    <Movies
                      movies={moviesData}
                      myLikedMovies={myLikedMovies}
                    ></Movies>
                    <Pagination
                      pages={pages}
                      currentPage={currentPage}
                      previousPage={previousPage}
                      nextPage={nextPage}
                      setPage={setPage}
                    ></Pagination>
                  </React.Fragment>
                ) : (
                  <h1>Oops No Movies found</h1>
                )
                }
              </Route>
              <Route path="/fav" exact component={Favourites}></Route>
              <Route path="/moviepage/:id" exact component={MoviePage}></Route>
              <Redirect to="/"></Redirect>
            </>
          ) : (
            <>
              <Route path="/login" component={Login} exact></Route>
              <Route path="/signup" component={Signup} exact></Route>
              <Redirect to="/login"></Redirect>
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
};

export default App;  