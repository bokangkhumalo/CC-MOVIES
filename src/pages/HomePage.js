// File: src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "../components/MovieList";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import "./HomePage.css";

function HomePage() {
  // State to hold the list of popular movies
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  // Fetch popular and upcoming movies when the component mounts
  useEffect(() => {
    const fetchPopularMovies = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const data = await response.json();
      // Update the state with the fetched popular movies
      setMovies(data.results);
    };

    fetchPopularMovies();
  }, []);

  // Function to handle search queries
  const handleSearch = async (query) => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );
    const data = await response.json();
    // Navigate to the search results page with the search results
    navigate("/search", { state: { movies: data.results } });
  };

  return (
    <div className="home-page">
      {/* Header component */}
      <Header />
      {/* Landing page section */}
      <div className="landing-page">
        <h1>Welcome to Movie Database</h1>
        <p>
          Discover the latest and greatest movies. Search for your favorite
          movies and explore popular ones.
        </p>
        {/* Search bar component */}
        <SearchBar onSearch={handleSearch} className="search-bar" />
      </div>
      {/* Heading for popular movies */}
      <h2>Popular Movies</h2>
      {/* Movie list component */}
      <MovieList movies={movies} />
      <Footer />
    </div>
  );
}

export default HomePage;
