import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSearchMovies } from "../js/api";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../js/firebase-config";
import "../css/NavbarStyles.css";
import { Link } from "react-router-dom";
import { setCart } from "../features/cartSlice";
// import {setCardCount} from "../features/cartSlice";

/*
 * Header component that renders the navigation bar with search and user authentication features.
 *
 * - Implements a search input with a dropdown for displaying search results.
 * - Listens for authentication state changes and updates the user state accordingly.
 * - Displays navigation links, a cart with item count, and user authentication links.
 * - Uses external CSS for styling and integrates with Redux for managing cart state.
 */

function Header() {
    const [query, setQuery] = useState("");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [user, setUser] = useState(null);
    const searchRef = useRef(null);
    const dispatch = useDispatch();

    const { data: results = [], isLoading } = useSearchMovies(query);

    const cartCount = useSelector((state) => state.cart.count);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        dispatch(setCart(savedCart));
    }, [dispatch]);

    const handleSearchInputChange = (e) => {
        const value = e.target.value.trim();
        setQuery(value);
        setDropdownVisible(value.length > 2);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    /**
     * Renders search results in a dropdown menu.
     *
     * - Displays a loading message when search results are being fetched.
     * - Shows a message if no search results are found.
     * - Maps over the search results and creates a clickable dropdown item for each movie,
     *   redirecting to the movie's detail page on click.
     * - Each dropdown item includes a thumbnail image and movie title with year.
     *
     * @returns {JSX.Element} A list of search result items or a message if loading or no results.
     */
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
                className="dropdown-item bg-[#2c2c2c] flex items-center py-1 px-2 cursor-pointer w-full border-b border-[#333] transition-colors duration-300 hover:bg-[#333]"
                onClick={() => (window.location.href = `/movie/${movie.id}`)}
            >
                <img
                    src={movie.small_cover_image}
                    alt={movie.title}
                    className="w-12 h-auto mr-2"
                />
                <div>
                    <p className="text-[#ccc] text-sm">
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
                            <Link to="/" className="nav-btn">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/"
                                style={{ color: "#6ac045" }}
                                className="nav-btn"
                            >
                                4K
                            </Link>
                        </li>
                        <li>
                                <Link to="/" className="nav-btn">
                                    Trending
                                </Link>
                        </li>
                        <li>
                            <Link to="/" className="nav-btn">
                                Browse Movies
                            </Link>
                        </li>
                    </ul>
                    <div className="relative">
                        <Link to="/cart" className="cart-nav-btn relative">
                            Cart
                            {cartCount > 0 && (
                                <span className="cart-count absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
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
