import { axiosInstance } from "."

//get all the movies

export const GetAllMovies = async() => {
    try {
        const response = await axiosInstance.get('/api/movies/get-all-movies');
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export const AddMovie = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/movies/add-movie', payload);
        return response.data;
    } catch (error) {
        return error.message
    }
}

export const UpdateMovie = async (payload) => {
    try {
        const response = await axiosInstance.put('/api/movies/update-movie',payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const DeleteMovie = async (payload) => {
    try {
        const response = await axiosInstance.delete('/api/movies/delete-movie',payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const GetMovieById = async(id) => {
    try {
        const response = await axiosInstance.get(`/api/movies/get-movie-by-id/${id}`);
        return response.data;
    } catch (error) {
        
    }
}