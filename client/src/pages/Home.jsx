import {useEffect, useState} from 'react'

import {message} from 'antd'
import { GetAllMovies } from '../apicalls/movies';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/loadersSlice';
import {useNavigate} from "react-router-dom"
import moment from "moment"

export default function Home(){
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState([]);

    let dispatch = useDispatch();
    let navigate = useNavigate();
    const getData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetAllMovies();
            if (response.success) {
                setMovies(response.data)
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (err) {
            message.error(err.message);
            dispatch(HideLoading());
        }
    }

    useEffect(() => {
        getData();
    }, [])
    return (movies.length > 0 &&
        <div className="content p-2">
            <input type='text' placeholder='Search For Currently Showing Movies'
                className='search-input' onChange={(e) => setSearchText(e.target.value)} />

            <div className="movie-row flex mt-2 gap-1">
                {movies
                    .filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
                    .map((movie) => (
                        <div
                            className="card cursor-pointer flex flex-col" 
                            onClick={() => navigate(`/movie/${movie._id}/?date=${moment().format("YYYY-MM-DD")}`)}
                        >
                            <img src={movie.poster} alt="" className="br-10"/>
                            <h5 style={{lineHeight:'2ch', marginTop:'8px'}}>{movie.title}</h5>
                        </div>
                ))}
            </div>
        </div>
    )
}