//* importing axios
import axios from "axios";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: "https://yts.mx/api/v2/", // YTS base API URL
});

//* yo function le movie list fetch garcha
export const fetchMovies = async (page = 1) => {
    try {
        const response = await axiosInstance.get("/list_movies.json", {
            params: { page },
        });
        return response.data.data.movies;
    } catch (error) {
        console.error("Error fetching movies", error);
        return []; // Return empty array in case of error
    }
};

//* yo function le details fetch garcha specific movie ko using ID
export const fetchMovieDetails = async (movieId) => {
    try {
        const response = await axiosInstance.get("/movie_details.json", {
            params: { movie_id: movieId },
        });
        return response.data.data.movie;
    } catch (error) {
        console.error("Error fetching movie details", error);
        return null; // Return null if error occurs
    }
};

//* Function to search
export const searchMovies = async (query) => {
    try {
        const response = await axiosInstance.get("/list_movies.json", {
            params: { query_term: query },
        });
        return response.data.data.movies || [];
    } catch (error) {
        console.error("Error searching movies", error);
        return []; 
    }
};
