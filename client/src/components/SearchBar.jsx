/* ======================================================
    Lab 9 - SearchBar.jsx starter
====================================================== */

import { useState } from "react";

export default function SearchBar({ searchTerm, onSearch }) {
    const [value, setValue] = useState(searchTerm);

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(value);
    }

    return (
        <form onSubmit={handleSubmit} className="searchBar">
            <input
                type="text"
                value={value}
                placeholder="Search movies"
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
}