/* ======================================================
    Lab 9 - MoviePage.jsx starter
====================================================== */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function MoviePage({ loggedInUser, setLoggedInUser }) {
    const [searchTerm, setSearchTerm] = useState("batman");
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies("batman");
        fetchWatchlist();
    }, []);

    async function fetchMovies(query) {
        try {
            setIsLoading(true);
            setError("");

            const url =
                `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "True") {
                setMovies(data.Search);
            } else {
                setMovies([]);
                setError(data.Error || "No movies found.");
            }
        } catch (err) {
            setMovies([]);
            setError("Failed to fetch movies.");
        } finally {
            setIsLoading(false);
        }
    }

    function handleSearch(newSearchTerm) {
        setSearchTerm(newSearchTerm);
        fetchMovies(newSearchTerm);
    }

    async function fetchWatchlist() {
        // TODO 21: 
        // Send GET /api/watchlist with credentials: "include". 
        // If response.ok is true, save the returned array in watchlist state. 
    }

    async function handleLogout() {
        // TODO 22: 
        // Send POST /api/logout with credentials: "include". 
        // If successful: 
        // 1. setLoggedInUser(null) 
        // 2. setWatchlist([]) 
        // 3. navigate("/") 
    }

    async function addToWatchlist(movie) {
        // TODO 23: 
        // Send POST /api/watchlist with JSON movie data. 
        // Include headers and credentials: "include". 
        // After a successful response, call fetchWatchlist() again. 
    }

    async function removeFromWatchlist(imdbID) {
        // TODO 24: 
        // Send DELETE /api/watchlist/:imdbID with credentials: "include". 
        // After a successful response, call fetchWatchlist() again. 
    }

    return (
        <main className="moviePage">
            <header className="topBar">
                <div>
                    <h1>Welcome, {loggedInUser}!</h1>
                    <p>Search OMDb and save movies to your personal watchlist.</p>
                    <p>Current search: {searchTerm}</p>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

            {isLoading && <p>Loading movies...</p>}
            {error && <p className="message">{error}</p>}

            <MovieGrid movies={movies} onAdd={addToWatchlist} />

            <section className="card">
                <h2>Your Watchlist</h2>
                {watchlist.length === 0 ? (
                    <p>No saved movies yet.</p>
                ) : (
                    <ul className="watchlist">
                        {watchlist.map((movie) => (
                            <li key={movie.imdbID}>
                                <span>{movie.Title} ({movie.Year})</span>
                                <button onClick={() => removeFromWatchlist(movie.imdbID)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}