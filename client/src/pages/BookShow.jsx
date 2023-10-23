import { message } from "antd";
import { useEffect, useState } from "react"
import { GetShowById } from "../apicalls/shows";
import { useParams } from "react-router-dom";
import moment from "moment";


export default function BookShow() {

    let [show, setShow] = useState();

    const params = useParams();
    const getData = async () => {
        {
            try {
                const response = await GetShowById({ showId: params.id });
                if (response.success) {
                    setShow(response.data);
                } else {
                    message.error(response.message);
                }

            } catch (error) {
                message.error(error.message)
            }
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (show &&
        <div> 
            {/* show information */}
            <div className="flex justify-between card p-2 items-center">
                <div>
                    <h1 className="text-sm">{show.theatre.name}</h1>
                    <h1 className="text-sm">{show.theatre.address}</h1>
                </div>
                <div>
                    <h1 className="text-xl uppercase"> {show.movie.title} </h1>

                </div>
                <div>
                <h1 className="text-sm">{show.movie.language}</h1>
                    <h1 className="text-sm">
                        {moment(show.date).format("MMM Do yyyy")} -{" "}
                        {moment(show.time, "HH:mm").format("hh:mm A")}
                    </h1>
                </div>
            </div>
        </div>
    )
}