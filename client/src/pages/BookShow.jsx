import { message, Button } from "antd";
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { GetShowById } from "../apicalls/shows";
import { MakePayment, BookShowTickets } from "../apicalls/bookings";
// import Button from "../components/Button";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import StripeCheckout from "react-stripe-checkout";
import moment from "moment"
import { useDispatch, useSelector } from "react-redux";


export default function BookShow() {

    const { user } = useSelector((state) => state.users);
    const [selectedSeats, setSelectedSeats] = useState([]);
    let [show, setShow] = useState();
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const getData = async () => {
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

    const getSeats = () => {
        const columns = 12;
        const totalSeats = show.totalSeats; // 120
        const rows = Math.ceil(totalSeats / columns); // 10

        return (
            <div>
                <p className="m-auto w-content h-content">Screen This Side</p>
                <hr />
                <div className="flex gap-1 flex-col p-2 mt-3">

                    {Array.from(Array(rows).keys()).map((seat, index) => {
                        return (
                            <div className="flex gap-1 justify-center">
                                {Array.from(Array(columns).keys()).map((column, index) => {
                                    const seatNumber = seat * columns + column + 1;
                                    let seatClass = "seat";
                                    if (selectedSeats.includes(seat * columns + column + 1)) {
                                        seatClass = seatClass + " selected-seat";
                                    }
                                    if (show.bookedSeats.includes(seat * columns + column + 1)) {
                                        seatClass = seatClass + " booked-seat";
                                    }
                                    return (
                                        seat * columns + column + 1 <= totalSeats && (
                                            <div
                                                className={seatClass}
                                                onClick={() => {
                                                    if (selectedSeats.includes(seatNumber)) {
                                                        setSelectedSeats(
                                                            selectedSeats.filter((item) => item !== seatNumber)
                                                        );
                                                    } else {
                                                        setSelectedSeats([...selectedSeats, seatNumber]);
                                                    }
                                                }}
                                            >
                                                <h1 className="text-sm">{seat * columns + column + 1}</h1>
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };


    const book = async (transactionId) => {
        try {
            dispatch(ShowLoading());
            const response = await BookShowTickets({
                show: params.id,
                seats: selectedSeats,
                transactionId,
                user: user._id,
            });
            if (response.success) {
                message.success(response.message);
                navigate("/profile");
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    };

    const onToken = async (token) => {
        try {
            dispatch(ShowLoading());
            const response = await MakePayment(
                token,
                selectedSeats.length * show.ticketPrice * 100
            );
            response.success = true;
            if (response.success) {
                message.success(response.message);
                book(response.data || params.id + `${Math.floor(Math.random() * 100)}`);
            } else {
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    };


    useEffect(() => {
        getData();
    }, []);

    return (show &&
        <div className="max-w-1280 m-auto">
            {/* show information */}
            <div className="flex justify-between p-2 items-center">
                <div>
                    <h1 className="text-xl uppercase"> {show.movie.title} </h1>
                    <span className="text-lg">{show.theatre.name} - {show.theatre.address}</span>
                </div>
                <div>
                    <p className="text-lg">
                        {show.movie.language}
                        <br />
                        {moment(show.date).format("Do MMM yyyy")}
                        <br />
                        {moment(show.time, "HH:mm").format("h:mm a")}
                    </p>
                </div>
            </div>

            {/* seats */}

            <div className="m-auto mt-2 w-min-content">
                {getSeats()}

                {selectedSeats.length > 0 && (
                    <div className="mt-2">
                        <div className="uppercase p-2">
                            <h1 className="text-sm">Selected Seats : {selectedSeats.join(", ")}</h1>

                            <h1 className="text-sm">
                                Total Price : {selectedSeats.length * show.ticketPrice}
                            </h1>
                        </div>
                        <div className="m-auto w-content">
                            <Button 
                                className="mr-1" 
                                size="large"
                                onClick={()=>{
                                    setSelectedSeats([]);
                                }} 
                            >Reset</Button>
                            <StripeCheckout
                                token={onToken}
                                amount={selectedSeats.length * show.ticketPrice * 100}
                                billingAddress
                                stripeKey="pk_test_51NqI5aSGV37PJpoExjngKrtj0l5FcCMLhEsTFIPXL1TiWl3rqwVpU5a3E0nHePVlwI5XZFaqxyMobu5cDM7V7HOv00GMc0Vbxv"
                            >
                                <Button type="primary" className="w-200" size="large" >Book Now</Button>
                            </StripeCheckout>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}