/* ======================================================
    Lab 9 - MovieCard.jsx starter
====================================================== */

export default function MovieCard({ movie, onAdd }) {
    const poster =
        movie.Poster && movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/200x300?text=No+Image";

    return (
        <article className="card">
            <img src={poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <button onClick={() => onAdd(movie)}>Add to Watchlist</button>
        </article>
    );
} 