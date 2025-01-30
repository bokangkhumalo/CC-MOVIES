// File: src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import MovieDetails from "./pages/MovieDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<HomePage />} />
        {/* Route for the search results page */}
        <Route path="/search" element={<SearchResultsPage />} />
        {/* Route for the movie details page */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
