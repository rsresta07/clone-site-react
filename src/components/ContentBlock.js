import React from "react";
import { useFetchMovies } from "../js/api"; // Import the React Query hook
import { Link } from "react-router-dom";
import "../css/ContentStyles.css";

function ContentBlock() {
    const page = 1; // Page number can be dynamic if pagination is added later
    const { data: movies = [], isLoading, isError } = useFetchMovies(page); // Destructure response from useFetchMovies

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading movies.</div>;
    }

    // Function to generate movie sections
    const createSectionHTML = (sectionTitle, loadMore, movieSlice) => {
        return (
            <div className="movies-section" key={sectionTitle}>
                <div className="category-title">
                    <p className="category-section">{sectionTitle}</p>
                    <a href="#" className="browse">
                        {loadMore}
                    </a>
                </div>
                <div className="movies-grid">
                    {movieSlice.map((movie) => (
                        <div className="movie" key={movie.id}>
                            <Link
                                to={`/movie/${movie.id}`}
                                className="movie-link"
                            >
                                <div className="movie-info">
                                    <div className="rating">
                                        {movie.rating} / 10
                                    </div>
                                    <div className="genre">
                                        {movie.genres.map((genre, index) => (
                                            <React.Fragment key={index}>
                                                {genre}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: "50px" }}>
                                        <button className="poster-hover-details-btn">
                                            Details
                                        </button>
                                    </div>
                                </div>
                                <img
                                    src={movie.medium_cover_image}
                                    alt={movie.title}
                                />
                                <p className="p1">{movie.title}</p>
                                <p>{movie.year}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const popularMovies = movies.slice(0, 4);
    const latestMovies = movies.slice(4, 12);
    const upcomingMovies = movies.slice(12, 20);

    return (
        <main className="landing">
            <div className="content">
                <h1>Download YTS YIFY movies: HD smallest size</h1>
                <p>
                    Welcome to the official YTS.MX website. Here you can browse
                    and download YIFY movies in excellent <br />
                    720p, 1080p, 2160p 4K and 3D quality, all at the smallest
                    file size. YTS Movies Torrents.
                </p>

                <a href="#">
                    <strong>IMPORTANT</strong> - YTS.MX is the only new official
                    domain for YIFY Movies
                </a>

                <div className="social-links">
                    <img
                        src="/telegram.svg"
                        width="16"
                        height="16"
                        alt="telegram logo"
                    />
                    <a href="#">@YTSMX_UPDATES</a>
                    <label style={{ color: "#ccc" }}> | </label>
                    <img
                        src="/twitter.svg"
                        width="16"
                        height="16"
                        alt="twitter logo"
                    />
                    <a href="#">
                        Follow @YTSYIFY for upcoming featured movies!
                    </a>
                </div>
            </div>

            {/* Render movie sections */}
            <div id="movies-container">
                {createSectionHTML(
                    "Popular Movies",
                    "Browse More",
                    popularMovies
                )}
                {createSectionHTML("Latest Movies", "Browse All", latestMovies)}
                {createSectionHTML(
                    "Upcoming Movies",
                    "Request a Movie",
                    upcomingMovies
                )}
            </div>
        </main>
    );
}

export default ContentBlock;
