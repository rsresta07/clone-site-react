import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchMovieDetails } from "../js/api";
import "../css/MovieDetailStyles.css";

/**
 * MovieDetails component fetches and displays detailed information about a specific movie.
 *
 * - Utilizes the `useFetchMovieDetails` hook to retrieve movie data based on a movie ID from URL parameters.
 * - Displays a loading message while data is being fetched, and an error message if fetching fails.
 * - Renders movie details including title, rating, genres, runtime, description, and price.
 * - Provides an "Add to Cart" button that adds the movie to the local storage cart.
 * - Prompts the user to view the cart after a movie is added, with navigation to the cart page.
 *
 * @returns {JSX.Element} The rendered movie details component.
 */
function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: movie, isLoading, isError } = useFetchMovieDetails(id);

    /**
     * Adds the current movie to the cart stored in local storage.
     *
     * - Constructs a movie data object with details such as id, title, price,
     *   poster, description, rating, genres, duration, and cast.
     * - Retrieves the existing cart from local storage or initializes an empty array.
     * - Checks if the movie is already in the cart; if not, adds it and updates local storage.
     * - Prompts the user to view the cart after adding the movie, with navigation to the cart page.
     * - Alerts the user if the movie is already in the cart.
     */
    const addToCart = () => {
        const movieData = {
            id,
            title: movie.title,
            price: (250.0).toFixed(2),
            poster: movie.medium_cover_image,
            description: movie.description_full,
            rating: movie.rating,
            genres: movie.genres,
            duration: movie.runtime,
            cast: movie.cast ? movie.cast.map((actor) => actor.name) : [],
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (!cart.some((item) => item.id === id)) {
            cart.push(movieData);
            localStorage.setItem("cart", JSON.stringify(cart));

            const goToCart = window.confirm(
                `${movie.title} has been added to the cart. Would you like to view your cart?`
            );
            if (goToCart) {
                navigate("/cart");
            }
        } else {
            alert("This movie is already in the cart.");
        }
    };

    // Loading and error handling
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading movie details. Please try again later.</div>;
    }
    console.log("Fetching movie details:", movie);
    return (
        <main className="landing p-5">
            <div className="content max-w-[800px] mx-auto bg-[#313131] rounded-lg shadow-md p-5;">
                <h1 className="text-3xl mb-5 text-gray-300 text-center">
                    {movie.title}
                </h1>
                <div className="movie-container flex gap-5 items-start flex-wrap">
                    <img
                        src={movie.medium_cover_image}
                        alt={movie.title}
                        className="movie-poster max-w-[40%] h-auto rounded-lg"
                    />
                    <div className="movie-details flex-1 text-gray-300 text-left">
                        <div className="movie-rating">
                            <strong>Rating:</strong>{" "}
                            <span className=" text-yellow-400">
                                {movie.rating}
                            </span>
                        </div>
                        <div className="movie-genre">
                            <strong>Genres:</strong> {movie.genres.join(", ")}
                        </div>
                        <div className="movie-duration">
                            <strong>Duration:</strong> {movie.runtime} minutes
                        </div>
                        <div className="movie-description">
                            <strong>Description:</strong>{" "}
                            <p className="text-justify">
                                {movie.description_full}
                            </p>
                        </div>
                        <div className="movie-price">
                            <strong>Price: </strong>
                            <span className="text-[#23c723]">
                                NPR {(250.0).toFixed(2)}
                            </span>
                        </div>
                        <button
                            className="addCart-btn inline-block px-5 py-2.5 bg-[#23c723] text-black rounded-lg transition-all duration-300 ml-2"
                            onClick={addToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MovieDetails;
