import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSearchMovies } from "../js/api";
import { auth } from "../js/firebase-config"; // Import Firebase auth instance
import "../css/NavbarStyles.css";

function Header() {
    const [query, setQuery] = useState("");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [user, setUser] = useState(null); // State to store user info
    const searchRef = useRef(null);

    // Use the custom React Query hook for searching movies
    const { data: results = [], isLoading } = useSearchMovies(query);

    // Handle input change and show dropdown if the query length is valid
    const handleSearchInputChange = (e) => {
        const value = e.target.value.trim();
        setQuery(value);
        setDropdownVisible(value.length > 2);
    };

    // Close dropdown on outside click
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Listen to user authentication status
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set the current user
        });
        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    const displaySearchResults = () => {
        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (!results.length) {
            return <p>No results found</p>;
        }

        return results.map((movie) => (
            <div
                key={movie.id}
                className="dropdown-item bg-[#2c2c2c] flex items-center py-1 px-2 cursor-pointer w-full border-b border-[#333] transition-colors duration-300"
                onClick={() => (window.location.href = `/movie/${movie.id}`)}
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
        <nav className="nav-bar mx-auto w-full top-0 relative z-50 bg-[#1d1d1d] overflow-hidden text-[#919191] border-b border-[#2f2f2f] flex justify-between items-center py-2 px-[5%]">
            <div className="nav-logo">
                <a href="/">
                    <img
                        src="https://yts.mx/assets/images/website/logo-YTS.svg"
                        alt="YTS Logo"
                    />
                </a>
            </div>

            <div className="nav-bar2 flex justify-between items-center w-3/5">
                <div id="quick-search-container" ref={searchRef}>
                    <input
                        className="quick-search-input w-full text-white border border-[#333] rounded-full py-2 px-3 bg-[#1d1d1d]"
                        id="searchInput"
                        type="search"
                        placeholder="Quick Search"
                        value={query}
                        onChange={handleSearchInputChange}
                    />
                    {isDropdownVisible && (
                        <div
                            id="dropdown"
                            className="dropdown absolute top-full left-0 bg-[#222] rounded-md shadow-lg z-50 w-full max-h-72 overflow-y-auto"
                        >
                            {displaySearchResults()}
                        </div>
                    )}
                </div>
                <div className="main-nav-links flex justify-between items-center flex-grow">
                    <ul className="nav-links list-none flex gap-5">
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
                    <ul className="nav-links list-none flex gap-5">
                        {user ? (
                            <li>
                                <a className="profile-nav-btn" href="/profile">
                                    User Profile
                                </a>
                            </li>
                        ) : (
                            <li>
                                <a className="login-nav-btn" href="/login-auth">
                                    Login
                                </a>
                                &nbsp;|&nbsp;
                                <a
                                    className="register-nav-btn"
                                    href="/registration"
                                >
                                    Register
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
