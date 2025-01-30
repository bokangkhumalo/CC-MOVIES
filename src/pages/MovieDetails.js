import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import "./MovieDetails.css";

function MovieDetails() {
  // Get the movie ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate();
  // State to hold the movie details, cast, similar movies, and trailer URL
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // Fetch movie details and similar movies when the component mounts or the ID changes
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos,credits`
      );
      const data = await response.json();
      setMovie(data);
      if (data.credits) {
        setCast(data.credits.cast);
      }

      // Find the YouTube trailer URL
      const trailer = data.videos.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTimeout(() => {
          setTrailerUrl(
            `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`
          );
        }, 4000); // Delay the video start by 4 seconds
      }
    };

    const fetchSimilarMovies = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`
      );
      const data = await response.json();
      setSimilarMovies(data.results);
    };

    fetchMovieDetails();
    fetchSimilarMovies();
  }, [id]);

  // Function to handle search queries
  const handleSearch = async (query) => {
    if (query.trim() === "") return;
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );
    const data = await response.json();
    // Navigate to the search results page with the search results
    navigate("/search", { state: { movies: data.results } });
  };

  // Show a loading message while the movie details are being fetched
  if (!movie) {
    return <div>Loading...</div>;
  }

  // Construct the image URL or use a placeholder if no image is available
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450";

  // Construct the background image URL or use a placeholder if no image is available
  const backgroundImageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : "https://via.placeholder.com/1280x720";

  return (
    <div className="movie-details-page">
      {/* Header component */}
      <Header onSearch={handleSearch} />
      {/* Background image with hover effect */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        {trailerUrl && (
          <iframe
            className="trailer-video"
            src={trailerUrl}
            title="Movie Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="movie-details-card">
        <div className="movie-details">
          {/* Movie poster image */}
          <img src={imageUrl} alt={movie.title} className="movie-poster" />
          <div className="movie-info">
            {/* Movie title */}
            <h1>{movie.title}</h1>
            {/* Movie genres */}
            <div className="genres">
              Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </div>
            {/* Movie overview */}
            <p>{movie.overview}</p>
            {/* Movie release date */}
            <p>Release Date: {movie.release_date}</p>
            {/* Movie rating */}
            <p>Rating: {movie.vote_average}</p>
          </div>
        </div>
        {/* Movie cast */}
        <div className="cast-list">
          <h2>Cast</h2>
          <div className="cast">
            {cast.map((actor) => (
              <div key={actor.cast_id} className="cast-member">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="cast-photo"
                />
                <p>
                  {actor.name} as {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Similar movies */}
      <div className="similar-movies">
        <h2>Similar Movies</h2>
        <MovieList movies={similarMovies} />
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default MovieDetails;
