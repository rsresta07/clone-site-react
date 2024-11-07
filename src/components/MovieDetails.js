import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchMovieDetails } from "../js/api";
import "../css/MovieDetailStyles.css";

function MovieDetails() {
    const { id } = useParams(); // Get movie ID from route
    const navigate = useNavigate(); // For redirecting to cart page

    // Use React Query hook to fetch movie details
    const { data: movie, isLoading, isError } = useFetchMovieDetails(id);

    // Function to add movie to cart
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
                navigate("/cart"); // Navigate to cart page if confirmed
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
        <main className="landing">
            <div className="content">
                <h1>{movie.title}</h1>
                <div className="movie-container">
                    <img
                        src={movie.medium_cover_image}
                        alt={movie.title}
                        className="movie-poster"
                    />
                    <div className="movie-details">
                        <div className="movie-rating">
                            <strong>Rating:</strong> {movie.rating}
                        </div>
                        <div className="movie-genre">
                            <strong>Genres:</strong> {movie.genres.join(", ")}
                        </div>
                        <div className="movie-duration">
                            <strong>Duration:</strong> {movie.runtime} minutes
                        </div>
                        <div className="movie-description">
                            <strong>Description:</strong>{" "}
                            <p style={{ textAlign: "justify" }}>
                                {movie.description_full}
                            </p>
                        </div>
                        <div className="movie-price">
                            <strong>Price: </strong>
                            <span style={{ color: "green" }}>
                                NPR {(250.0).toFixed(2)}
                            </span>
                        </div>
                        <button className="addCart-btn" onClick={addToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MovieDetails;
