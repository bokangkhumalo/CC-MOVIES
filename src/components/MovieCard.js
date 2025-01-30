import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  // Construct the image URL or use a placeholder if no image is available
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300";

  // Function to handle click event and navigate to the movie details page
  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      {/* Movie poster image */}
      <img src={imageUrl} alt={movie.title} className="movie-card-img" />
      {/* Movie title */}
      <h3 className="movie-card-title">{movie.title}</h3>
      {/* Movie release date */}
      <p className="movie-card-date">{movie.release_date}</p>
    </div>
  );
}

export default MovieCard;
