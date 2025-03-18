import { useEffect, useState } from "react";

const API_KEY = "8349efa1"; // Replace with your OMDb API key
const API_URL = `https://www.omdbapi.com/?s=batman&apikey=${API_KEY}`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container">
      <h1>Movie Database</h1>
      {error && <p className="error">{error}</p>}
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <h2>{movie.Title}</h2>
            <p>Year: {movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;