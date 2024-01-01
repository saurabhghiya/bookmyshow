import { axiosInstance } from "."

//get all the theares

export const GetAllTheatres = async() => {
    try {
        const response = await axiosInstance.get('/api/theatres/get-all-theatres');
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const GetAllTheatresByOwner = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/theatres/get-all-theatres-by-owner', payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const AddTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/theatres/add-theatre', payload);
        return response.data;
    } catch (error) {
        return error.message
    }
}

export const UpdateTheatre = async (payload) => {
    try {
        const response = await axiosInstance.put('/api/theatres/update-theatre',payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const DeleteTheatre = async (payload) => {
    try {
        const response = await axiosInstance.delete('/api/theatres/delete-theatre',{data: payload});
        return response.data;
    } catch (error) {
        return error.message;
    }
}