/* ======================================================
    Lab 9 - MovieGrid.jsx starter
====================================================== */

import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, onAdd }) {
    if (!movies.length) {
        return <p>No movie results to display.</p>;
    }

    return (
        <section className="movieGrid">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} onAdd={onAdd} />
            ))}
        </section>
    );
}