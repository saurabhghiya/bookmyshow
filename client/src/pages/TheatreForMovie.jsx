import { message, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { GetMovieById } from "../apicalls/movies";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { GetTheatresByMovie } from "../apicalls/shows"
import moment from "moment";

export default function TheatreForMovie() {
  let [movie, setMovie] = useState()
  let [theatres, setTheatres] = useState();
  let [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetMovieById(params.id)
      if (response.success) {
        setMovie(response.data);
        message.success(response.message)
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message)
    }
  }

  const getTheatres = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetTheatresByMovie({ date, movie: params.id })
      if (response.success) {
        setTheatres(response.data);
        message.success(response.message)
      } else {
        message.error(response.message);

      }
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    getTheatres()
  }, [date])

  return (
    movie && (
      <div className="max-w-1280 m-auto" >
        {/* movie information */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl uppercase">
              {movie.title}
            </h1>
            <p>
              Duration : {movie.duration} mins
              <br />
              Release Date : {moment(movie.releaseDate).format("MMM Do yyyy")}
              <br />
              Genre : {movie.genre}
              <br />
              Language : {movie.language}
            </p>
          </div>

          <div className="mr-3">
            <h1 className="text-md ">Select Date</h1>
            <Input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                navigate(`/movie/${params.id}?date=${e.target.value}`);
              }}
            />
          </div>
        </div>
        <hr />
        {/* movie theatres */}
        <div className="mt-1">
          <h1 className="text-xl uppercase">Theatres</h1>
        </div>
        <div className="mt-1 flex flex-col gap-1">
          {theatres && theatres.map((theatre) => (
            <div className="p-2">
              <div>
                <b className="text-lg uppercase">{theatre.name}</b>
                <br />
                {theatre.address}
              </div>
              <div className="divider"></div>
              <div className="flex gap-2">
                {theatre.shows
                  .sort(
                    (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                  )
                  .map((show) => (
                    <>
                      <Button
                        style={{}}
                        size="large"
                        key={show._id}
                        onClick={() => {
                          navigate(`/book-show/${show._id}`);
                        }}
                      >
                        {moment(show.time, "HH:mm").format("h.mm a")}
                      </Button>
                    </>
                  ))}

              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}