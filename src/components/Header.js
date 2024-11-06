import React from "react";
import "../css/NavbarStyles.css"; 

function Header() {
    return (
        <nav class="nav-bar">
            <div class="nav-logo">
                <a href="#">
                    <img
                        src="https://yts.mx/assets/images/website/logo-YTS.svg"
                        alt="YTS Logo"
                    />
                </a>
            </div>

            <div class="nav-bar2">
                <div id="quick-search-container">
                    <input
                        class="quick-search-input"
                        id="searchInput"
                        type="search"
                        placeholder="Quick Search"
                    />
                    <div id="dropdown" class="dropdown"></div>
                </div>
                <div class="main-nav-links">
                    <ul class="nav-links">
                        <li>
                            <a href="#" class="nav-btn">
                                {" "}
                                Home{" "}
                            </a>
                        </li>
                        <li>
                            <a href="#" style={{color: "#6ac045"}}class="nav-btn">
                                4K
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-btn">
                                {" "}
                                Trending{" "}
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-btn">
                                Browse Movies
                            </a>
                        </li>
                    </ul>
                    <ul class="nav-links">
                        <li>
                            <a class="login-nav-btn" href="#">
                                Login
                            </a>
                            &nbsp;|&nbsp;
                            <a class="register-nav-btn" href="#">
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
