import React, { useState, useEffect } from "react";
import { searchMovies } from "../js/api"; // Adjust the import path based on your file structure
import "../css/NavbarStyles.css"; // Make sure to import your CSS

function Header() {
    const [query, setQuery] = useState(""); // State for search input
    const [results, setResults] = useState([]); // State for search results
    const [isDropdownVisible, setDropdownVisible] = useState(false); // Control dropdown visibility

    // Handle search input change
    const handleSearchInputChange = async (e) => {
        const value = e.target.value.trim();
        setQuery(value);

        if (value.length > 2) {
            const movies = await searchMovies(value);
            setResults(movies);
            setDropdownVisible(true);
        } else {
            setResults([]);
            setDropdownVisible(false);
        }
    };

    // This effect runs when the query changes
    useEffect(() => {
        // Reset dropdown when query is empty
        if (!query) {
            setDropdownVisible(false);
        }
    }, [query]);

    const displaySearchResults = () => {
        if (!results.length) {
            return <p>No results found</p>;
        }

        return results.map((movie) => (
            <div
                key={movie.id}
                className="dropdown-item"
                onClick={() =>
                    (window.location.href = `/movieDetails?id=${movie.id}`)
                }
            >
                <img src={movie.small_cover_image} alt={movie.title} />
                <div>
                    <p>
                        {movie.title} ({movie.year})
                    </p>
                </div>
            </div>
        ));
    };

    return (
        <nav className="nav-bar">
            <div className="nav-logo">
                <a href="#">
                    <img
                        src="https://yts.mx/assets/images/website/logo-YTS.svg"
                        alt="YTS Logo"
                    />
                </a>
            </div>

            <div className="nav-bar2">
                <div id="quick-search-container">
                    <input
                        className="quick-search-input"
                        id="searchInput"
                        type="search"
                        placeholder="Quick Search"
                        value={query}
                        onChange={handleSearchInputChange}
                    />
                    {isDropdownVisible && (
                        <div id="dropdown" className="dropdown">
                            {displaySearchResults()}
                        </div>
                    )}
                </div>
                <div className="main-nav-links">
                    <ul className="nav-links">
                        <li>
                            <a href="#" className="nav-btn">
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                style={{ color: "#6ac045" }}
                                className="nav-btn"
                            >
                                4K
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-btn">
                                Trending
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav-btn">
                                Browse Movies
                            </a>
                        </li>
                    </ul>
                    <ul className="nav-links">
                        <li>
                            <a className="login-nav-btn" href="#">
                                Login
                            </a>
                            &nbsp;|&nbsp;
                            <a className="register-nav-btn" href="#">
                                Register
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
