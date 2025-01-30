import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieList from "../components/MovieList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./SearchResultsPage.css";

function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movies } = location.state || { movies: [], query: "" };

  // Function to handle search queries
  const handleSearch = async (query) => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );
    const data = await response.json();
    // Navigate to the search results page with the search results
    navigate("/search", { state: { movies: data.results, query } });
  };

  return (
    <div className="search-results-page">
      {/* Header component */}
      <Header onSearch={handleSearch} />
      {/* Heading for search results */}
      <h2>Search results: </h2>
      {/* Movie list component */}
      <MovieList movies={movies} />
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default SearchResultsPage;
