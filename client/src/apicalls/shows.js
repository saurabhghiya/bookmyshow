import { axiosInstance } from ".";


export const AddShow = async(payload) => {
    try {
        const response = await axiosInstance.post('/api/shows/add-show', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const GetAllShowsByTheatre = async(payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/get-all-shows-by-theatre', payload);
        return response.data;
    }catch(error){
        return error.message;
    }
}

export const UpdateShows = async(payload) => {
    try {
        const response = await axiosInstance.put('/api/shows/update-shows',payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const DeleteShows = async(payload) => {
    try {
        const response = await axiosInstance.delete('/api/shows/delete-shows',payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const GetTheatresByMovie = async(payload)=>{
    try{
        const response = await axiosInstance.post('/api/shows/get-all-theatres-by-movie',payload);
        return response.data;
    }catch(err){
        return err.response
    }
}

export const GetShowById = async(payload)=>{
    try{
        const response = await axiosInstance.post('/api/shows/get-show-by-id',payload);
        return response.data;
    }catch(err){
        return err.response
    }
}