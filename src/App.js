import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=ba13cb1e";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = fetch(`${API_URL}&s=${title}`);
    const data = await (await response).json();

    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies(searchTerm);
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          (
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
          )
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
