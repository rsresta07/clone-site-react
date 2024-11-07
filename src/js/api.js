import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Axios instance
const axiosInstance = axios.create({
    baseURL: "https://yts.mx/api/v2/", // YTS base API URL
});

// Custom hook to fetch movies
export const useFetchMovies = (page = 1) => {
    return useQuery({
        queryKey: ["movies", page], // query key
        queryFn: async () => {
            const response = await axiosInstance.get("/list_movies.json", {
                params: { page },
            });
            return response.data.data.movies;
        },
        keepPreviousData: true,
        staleTime: 300000,
    });
};

export const useFetchMovieDetails = (movieId) => {
    return useQuery({
        queryKey: ["movieDetails", movieId],
        queryFn: async () => {
            const response = await axiosInstance.get("/movie_details.json", {
                params: { movie_id: movieId },
            });
            return response.data.data.movie;
        },
        enabled: !!movieId,
        staleTime: 300000,
    });
};

export const useSearchMovies = (query) => {
    return useQuery({
        queryKey: ["searchMovies", query],
        queryFn: async () => {
            const response = await axiosInstance.get("/list_movies.json", {
                params: { query_term: query },
            });
            return response.data.data.movies || [];
        },
        enabled: !!query,
        staleTime: 300000,
    });
};
